var express = require('express');
var dumpRouter = require('../');
var app = express();
var request = require('request');

app.get('/__dump__router__', dumpRouter());
app.get('/foo', function () {});
app.get('/bar', function () {});

var router = express.Router();
router.get('/baz', function () {});
app.use(router);
app.listen(13291);

describe('dumpRouter', function () {
    it('should dump router list', function (done) {
        request('http://127.0.0.1:13291/__dump__router__', function (resp) {
            console[console.debug ? 'debug' : 'log']("resp:", resp);
        });
    });
});
