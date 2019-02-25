const modules = require("./index.js").modules;
const http = require("http");
const fs = require("fs");
const pug = require('pug');
const express = require('express');
const app = express();
app.set("views", "static");
app.use("/", express.static("./static/"));

app.get('/', function (req, res) {
    const paths = modules.getFilePaths("./content");
    const categorised = modules.sort(paths);
    res.render('index.pug', {category: categorised});
});
app.get(/.+/, function (req, res) {
    res.download("content" + req.url)
});
app.delete(/.+/, function (req, res) {
    fs.unlink("content/" + req.url, function (err) {
        if (err) throw err;
        // if no error, file has been deleted successfully
        console.log('File deleted!');
    });
    res.send("success")
});
app.listen(8000);
