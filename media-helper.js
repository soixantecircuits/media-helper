'use strict'

const fs = require('fs')
const Buffer = require('buffer').Buffer
const mmm = require('mmmagic')
const mime = require('mime-types')
const request = require('request').defaults({ encoding: null })
const axios = require('axios').default

const Magic = mmm.Magic
const typechecker = new Magic(mmm.MAGIC_MIME_TYPE)

/**
 * Determines if a string is base64 encoded
 * @param {string} str - The string to be tested
 * @returns {boolean}
 */
function isBase64(str) {
  if (str != null) {
    const base64Regex =
      /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/
    return base64Regex.test(str)
  } else {
    return false
  }
}

/**
 * Determines if a string is an URL
 * @param {string} str - The string to be tested
 * @returns {boolean}
 */
function isURL(str) {
  var matcher = /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/
  return matcher.test(encodeURI(str))
}

/**
 * Determines if a file exists
 * @param {string} path - Path to a file
 * @returns {boolean}
 */
function isFile(path) {
  return fs.existsSync(path)
}

/**
 * Determines if a media is Buffer
 * @param {string} path - Path to a file
 * @returns {boolean}
 */
function isBuffer(buffer) {
  return buffer instanceof Buffer
}

/**
 * Determines the mime-type of a file
 * @param {string} media - either path, URL or base64 datas.
 * @returns {Promise}
 */
function getMimeType(media) {
  return new Promise((resolve, reject) => {
    if (isFile(media)) {
      typechecker.detectFile(media, (err, result) => {
        err && reject(err)
        resolve(result)
      })
    } else if (isBuffer(media)) {
      typechecker.detect(media, (err, result) => {
        err && reject(err)
        resolve(result)
      })
    } else if (isBase64(media)) {
      return getMimeType(toBuffer(media))
    } else if (isURL(media)) {
      return getMimeType(toBuffer(media))
    } else {
      reject('media is not a file')
    }
  })
}

/**
 * Determines the mime-type from the path or a part of the path
 * @param {string} path - Path to a file
 * @returns {string} or {false}
 */
function getMimeFromName(mediaPathName) {
  return mime.lookup(mediaPathName)
}

/**
 * Determines if a file is an image
 * @param {string} path - Path to a file
 * @returns {Promise}
 */
function isImage(path) {
  return new Promise((resolve, reject) => {
    getMimeType(path)
      .then((type) => {
        type.indexOf('image') > -1 ? resolve(true) : resolve(false)
      })
      .catch((err) => reject(err))
  })
}

/**
 * Determines if a file is a video
 * @param {string} path - Path to a file
 * @returns {Promise}
 */
function isVideo(path) {
  return new Promise((resolve, reject) => {
    getMimeType(path)
      .then((type) => {
        type.indexOf('video') > -1 ? resolve(true) : resolve(false)
      })
      .catch((err) => reject(err))
  })
}

/**
 * Reads an image from url and convert it to base64
 * @param {string} url
 * @returns {Promise}
 */
function urlToBase64(url) {
  return new Promise(async (resolve, reject) => {
    // let body = await got(url, { encoding: null })
    axios
      .get(url, { responseType: 'arraybuffer' })
      .then(function (response) {
        // handle success
        //console.log(response)
        resolve(Buffer.from(response.data, 'binary').toString('base64'))
      })
      .catch(function (error) {
        // handle error
        reject(error)
      })
    // request.get(url, (err, response, body) => {
    //   console.log(err)
    //   err && reject(err)
    //   resolve(body.toString('base64'))
    // })
    // resolve(body.toString('base64'))
  })
}

/**
 * Reads an image file and convert it to base64
 * @param {string} path - Path to a file
 * @returns {Promise}
 */
function fileToBase64(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, { encoding: 'base64' }, (err, data) => {
      err && reject(err)
      resolve(data)
    })
  })
}

/**
 * Reads an image from file or url and convert it to base64
 * @param {string} media - url or path
 * @returns {Promise}
 */
function toBase64(media) {
  return new Promise((resolve, reject) => {
    if (isBase64(media)) {
      resolve(media)
    } else if (isURL(media)) {
      urlToBase64(media)
        .then((data) => resolve(data))
        .catch((error) => reject(error))
    } else if (isFile(media)) {
      fileToBase64(media)
        .then((data) => resolve(data))
        .catch((error) => reject(error))
    } else if (isBuffer(media)) {
      const base64 = media.toString('base64')
      resolve(base64)
    } else {
      reject('Error: toBase64(): cannot convert media')
    }
  })
}

/**
 * Returns a base64 string without the dataURI scheme ("data;mime/type;base64,")
 * @param {media} media - dataURL string
 * @returns {Promise}
 */
function trimDataURI(dataURL) {
  const dataUIRregex = /data:[a-zA-Z]+?\/[a-zA-Z]+?;base64,/gi
  return dataURL.replace(dataUIRregex, '')
}

/**
 * Reads an image from file or url and convert it to Buffer
 * @param {media} media - file, url or path
 * @returns {Promise}
 */
function toBuffer(media) {
  return new Promise((resolve, reject) => {
    if (isURL(media)) {
      toBase64(media)
        .then((data) => {
          toBuffer(data)
            .then((data) => resolve(data))
            .catch((error) => reject(error))
        })
        .catch((error) => reject(error))
    } else if (isBase64(media)) {
      try {
        resolve(Buffer.from(media))
      } catch (ex) {
        reject(ex)
      }
    } else if (isFile(media)) {
      fs.readFile(media, (err, data) => {
        err && reject(err)
        resolve(data)
      })
    } else {
      reject('Error: toBuffer(): argument must be file, url or file')
    }
  })
}

module.exports = {
  isBase64,
  isURL,
  isFile,
  isBuffer,
  fileToBase64,
  urlToBase64,
  toBase64,
  toBuffer,
  isVideo,
  isImage,
  getMimeType,
  getMimeFromName,
  trimDataURI
}
