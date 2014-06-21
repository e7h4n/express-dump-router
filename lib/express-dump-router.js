var express = require('express');
var pathToRegexp = require('path-to-regexp');
var routerProto = express.Router().__proto__;
var ignoreRegexp = ['/^\\/?(?=/|$)/i', '/^(.*)\\/?$/i']; // ignore global match

module.exports = function () {
    return function (req, res) {
        var regexpList = req.app._router.stack.reduce(function findProto(memo, curr) {
            if (ignoreRegexp.indexOf(curr.regexp.toString()) === -1 && curr.regexp.toString() !== pathToRegexp(req.route.path, []).toString()) {
                memo.push(curr.regexp.toString());
            }

            if (curr.handle.__proto__ === routerProto && curr.handle.stack) {
                memo = curr.handle.stack.reduce(findProto, memo);
            }

            return memo;
        }, []);

        res.send(regexpList);
    };
};
