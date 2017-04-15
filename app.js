/**
 * Created by Jerry on 2017/4/8.
 */


var express = require('express');
var multer = require('multer');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());

//存储图片
var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./Images");
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

//field name and max count
var upload = multer({ storage: Storage }).array("imgUploader", 3);

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html");
});


app.post('/upload', function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            return res.end("Something went wrong!");
        }
        res.send("What should I do?" + "<br>");
        return res.end("File uploaded successfully!.");
    });
});

// app.get('/file/:name', function (req, res, next) {
//
//     var options = {
//         root: __dirname + '/Scripts/',
//         dotfiles: 'deny',
//         headers: {
//             'x-timestamp': Date.now(),
//             'x-sent': true
//         }
//     };
//
//     var fileName = req.params.name;
//     res.sendFile(fileName, options, function (err) {
//         if (err) {
//             console.log(err);
//             res.status(err.status).end();
//         }
//         else {
//             console.log('Sent:', fileName);
//         }
//     });
// });

app.listen(2000, function (err) {
    console.log("Listening to port 2000");
});