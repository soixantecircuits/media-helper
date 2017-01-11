'use strict'

import test from 'ava'

const mh = require('../media-helper')
const path = require('path')
const fs = require('fs')

const base64 = fs.readFileSync(path.resolve(__dirname, 'assets/base64.txt'), { encoding: 'utf-8' })
const filepath = path.resolve(__dirname, './assets/image.jpg')
const URL = 'http://placehold.it/350x150'
const buffer = Buffer.from(base64)

test('isBase64', (t) => {
  const result = mh.isBase64(base64)
  t.is(result, true)
})
test('isURL', (t) => {
  const result = mh.isURL(URL)
  t.is(result, true)
})
test('isFile', (t) => {
  const result = mh.isFile(filepath)
  t.is(result, true)
})
test('isBuffer', (t) => {
  const result = mh.isBuffer(buffer)
  t.is(result, true)
})
test('getMimeType on base64', (t) => {
  mh.getMimeType(base64)
    .then((type) => {
      t.is(type, 'image/gif')
    })
})
