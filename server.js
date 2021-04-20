var express = require('express');
var favicon = require('serve-favicon');
var path = require('path');
var app = express();
var port = 80;

app.use(favicon(path.join(__dirname, 'platforms/browser/www/img', 'favicon.ico')));
app.use('/css', express.static('platforms/browser/www/css'));
app.use('/img', express.static('platforms/browser/www/img'));
app.use('/js', express.static('platforms/browser/www/js'));
app.use('/', express.static('platforms/browser/www'));



app.get('/', (req, res) => {
    res.sendFile('./platforms/browser/www/index.html', { root: __dirname });
 });

app.listen(port);
