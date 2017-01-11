# media-helper

## Installation

`npm install media-helper --save` ⚡️  `yarn add media-helper`

## Usage

```js
const mh = require('media-helper')

const path = "/path/to/image.jpg"
const url = "http://somesite.com/img.jpg"

if (mh.isFile(path)) {
  console.log(path, " is an existing file !")

  mh.toBase64(path)
    .then((data) => {
      // data is the base64 datas for the file
    })
    .catch((err) => {
      console.log(err)
    })
}

if (mh.isURL(url)) {
  console.log(url, " is an URL !")

  mh.toBase64(url)
    .then(data => {
      // data is the base64 datas for the image
    })
    .catch((err) => {
      console.log(err)
    })
}

```

## API

|method|parameters|returns|description|
|:---|:---:|:---:|:---|
|`isBase64`| `string` | `boolean` |Determines if a string is base64 encoded.|
|`isFile`| `path` | `boolean` |Determines if a string describes a path to an existing file on your system.|
|`isURL`| `url` | `boolean` |Determines if a string describes an HTTP URL.|
|`isBuffer`| `Buffer` | `boolean` |Determines if an object is a `Buffer`.|
|`getMimeType`| `path` | `Promise` |Determines the mime-type of a file on your system.|
|`isImage`| `path` | `Promise` |Determines if a file is an image.|
|`isVideo`| `path` | `Promise` |Determines if a file is a video.|
|`toBuffer`| `string` | `Promise` |Converts an image to Buffer. `string` can describe either a path, base64 datas or an url.|
|`toBase64`| `string` | `Promise` |Converts an image to base64. `string` can describe either a path or an url.|
|`urlToBase64`| `url` | `Promise` |Converts an image to base64 through an URL.|
|`fileToBase64`| `path` | `Promise` |Converts an image on your system to base64.|
