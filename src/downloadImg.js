var fs = require('fs')
var request = require('request')
// import img from "./public/NaikeIdent.png";

let uri, path;
// Get from html request (GET)
uri = 'https://www.google.com/images/srpr/logo3w.png'; 
path = './src/google.png';
// Manage import images
const download = (uri, filename, callback) =>{
    request.head(uri, (err, res, body) =>{
        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);
        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    })
}

download(uri, path, () => console.log('done'));