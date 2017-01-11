'use strict'

import test from 'ava'

const mh = require('../media-helper')
const path = require('path')
const fs = require('fs')

const base64 = fs.readFileSync(path.resolve(__dirname, 'assets/base64.txt'), { encoding: 'utf-8' })
const dataURL = fs.readFileSync(path.resolve(__dirname, 'assets/dataURL.txt'), { encoding: 'utf-8' })
const filepath = path.resolve(__dirname, './assets/image.jpg')
const URL = 'http://lorempixel.com/400/200/'
const buffer = Buffer.from(base64)

/* Basic type checks */
test('null is not base64', (t) => {
  const b64 = mh.isBase64(null)
  t.is(b64, false)
})
test('null is not Buffer', (t) => {
  const buff = mh.isBuffer(null)
  t.is(buff, false)
})
test('null is not URL', (t) => {
  const url = mh.isURL(null)
  t.is(url, false)
})
test('null is not file', (t) => {
  const file = mh.isFile(null)
  t.is(file, false)
})
test('isBase64', (t) => {
  const result = mh.isBase64(base64)
  t.true(result)
})
test('isURL', (t) => {
  const result = mh.isURL(URL)
  t.true(result)
})
test('isFile', (t) => {
  const result = mh.isFile(filepath)
  t.true(result)
})
test('isBuffer', (t) => {
  const result = mh.isBuffer(buffer)
  t.true(result)
})
/* conversions */
// test('dataURL to base64', (t) => {
//   const result = mh.trimDataURI(dataURL)
//   const check = mh.isBase64(result)
//   t.true(check)
// })
// test('null to Base64', (t) => {
//   return mh.toBase64(null)
//     .then((result) => {
//       t.fail()
//     })
//     .catch(() => {
//       t.pass()
//     })
// })
// test('{} to Base64', (t) => {
//   return mh.toBase64({})
//     .then((result) => {
//       t.fail()
//     })
//     .catch(() => {
//       t.pass()
//     })
// })
// test('URL to Base64', (t) => {
//   return mh.toBase64(URL)
//     .then((result) => {
//       const check = mh.isBase64(null)
//       t.true(check)
//     })
//     .catch((err) => {
//       t.fail(err)
//     })
// })
// test('file to Base64', (t) => {
//   return mh.toBase64(filepath)
//     .then((result) => {
//       const check = mh.isBase64(result)
//       t.true(check)
//     })
//     .catch((err) => {
//       t.fail(err)
//     })
// })
// test('Buffer to Base64', (t) => {
//   return mh.toBase64(buffer)
//     .then((result) => {
//       const check = mh.isBase64(result)
//       t.true(check)
//     })
//     .catch((err) => {
//       t.fail(err)
//     })
// })
/* mime-type checks */
// test('getMimeType on base64', (t) => {
//   return mh.getMimeType(base64)
//     .then((type) => {
//       t.is(type, 'image/gif')
//     })
//     .catch((err) => {
//       t.fail(err)
//     })
// })
