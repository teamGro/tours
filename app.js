const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');

let app = express();

let port = process.env.PORT;
if (port === null || port === '' || port === undefined) {
    port = 8000;
}
app.set('port', port);
app.use(express.static(__dirname + '/public'));
app.disable('x-powered-by');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(200).send('index.html');
});

app.use(function (req, res) {
    res.status(404);
    res.send('404 - страница не найдена');
});

app.use(function (err, req, res, next) {
    console.error(err.stack);

    res.status(500);
    res.render('500 - server error');
});





http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});