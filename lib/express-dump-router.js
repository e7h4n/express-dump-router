var pathToRegexp = require('path-to-regexp');
var ignoreRegexp = ['/^\\/?(?=/|$)/i', '/^(.*)\\/?$/i']; // ignore global match

module.exports = function () {
    return function (req, res) {
        var routerProto = Object.getPrototypeOf(req.app._router);
        var regexpList = req.app._router.stack.reduce(function findProto(memo, curr) {
            if (ignoreRegexp.indexOf(curr.regexp.toString()) === -1 && curr.regexp.toString() !== pathToRegexp(req.route.path, []).toString()) {
                memo.push(curr.regexp.toString());
            }

            if (Object.getPrototypeOf(curr.handle) === routerProto) {
                memo = curr.handle.stack.reduce(findProto, memo);
            }

            return memo;
        }, []);

        res.send(regexpList);
    };
};
