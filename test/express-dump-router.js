var express = require('express');
var dumpRouter = require('../');
var app = express();
var request = require('request');
var assert = require('chai').assert;

app.get('/foo', function () {});
app.get('/bar', function () {});

var router = express.Router();
router.get('/baz', function () {});
app.use(router);
app.listen(9291);

describe('dumpRouter', function () {
    it('should dump router list by function', function () {
        assert.deepEqual(dumpRouter(app).map(function (regexp) {
            return regexp.toString();
        }), [
            '/^\\/foo\\/?$/i',
            '/^\\/bar\\/?$/i',
            '/^\\/baz\\/?$/i'
        ]);
    });
});
