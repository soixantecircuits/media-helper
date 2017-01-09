# media-helper


## Installation

`npm install media-helper`


## Usage
```
var med = require('media-helper')

var path = "/path/to/an/image/"
var url = "http://somesite.com/img.jpg"

if (med.isFile(path) === true ) {
    console.log(path, " is an existing file !")
}
if (med.isURL(url) === true) {
    console.log(url, " is an URL !")
}

var base64_path, base64_url
// This function returns a Promise
med.toBase64(path).then(data => {
    base64_path = data
})
med.toBase64(url).then(data => {
    base64_url = data
})
```


## API

`isBase64 (str)`: Determines if a string is base64 encoded. Returns boolean.

`isFile (path)`: Determines if a string describes a path to an existing file on your system. Returns boolean.

`isURL (url)`: Determines if a string describes an URL. Returns boolean.

`getMimeType (path)`: Determines the mime-type of a file on your system. Uses Promise.

`isImage (path)`: Determines if a file is an image. Uses Promise.

`isVideo (path)`: Determines if a file is a video. Uses Promise.

`toBase64 (str)`: Converts an image to base64, the `str` parameter can describe either a path or an url. Uses Promise.

`urlToBase64 (url)`: Converts an image to base64 through an URL. Uses Promise.

`fileToBase64 (path)`: Converts an image on your system to base64. Uses Promise
