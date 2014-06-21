var pathToRegexp = require('path-to-regexp');
var ignoreRegexp = ['/^\\/?(?=/|$)/i', '/^(.*)\\/?$/i']; // ignore global match

function getRouterList (app) {
    var routerProto = Object.getPrototypeOf(app._router);
    return app._router.stack.reduce(function findProto(memo, curr) {
        if (ignoreRegexp.indexOf(curr.regexp.toString()) === -1) {
            memo.push(curr.regexp.toString());
        }

        if (Object.getPrototypeOf(curr.handle) === routerProto) {
            memo = curr.handle.stack.reduce(findProto, memo);
        }

        return memo;
    }, []);
}

module.exports = getRouterList;
