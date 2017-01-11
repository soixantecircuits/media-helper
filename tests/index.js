/* globals describe it */
'use strict'

const mh = require('../media-helper')
const path = require('path')
const fs = require('fs')

const chai = require('chai')
const expect = chai.expect
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)

const base64 = fs.readFileSync(path.resolve(__dirname, 'assets/base64.txt'), { encoding: 'utf-8' })
const filepath = path.resolve(__dirname, './assets/image.jpg')
const URL = 'http://placehold.it/350x150'
const buffer = Buffer.from(base64)

describe('media checker', () => {
  describe('isBase64', () => {
    it('should return true', () => {
      const result = mh.isBase64(base64)
      return expect(result).to.equal(true)
    })
  })
  describe('base64 MIME', () => {
    it('should return image/gif', () => {
      const result = mh.getMimeType(base64)
      return expect(result).to.eventually.equal('image/gif')
    })
  })
  describe('isURL', () => {
    it('should return true', () => {
      const result = mh.isURL(URL)
      return expect(result).to.equal(true)
    })
  })
  describe('isFile', () => {
    it('should return true', () => {
      const result = mh.isFile(filepath)
      return expect(result).to.equal(true)
    })
  })
  describe('isBuffer', () => {
    it('should return true', () => {
      const result = mh.isBuffer(buffer)
      return expect(result).to.equal(true)
    })
  })
})
