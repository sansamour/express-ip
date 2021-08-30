"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIpInfoMiddleware = exports.getIpInfo = void 0;
const geoip = require("geoip-country");
function getIpInfo(ip) {
    var lookedUpIP = geoip.lookup(ip);
    if (!lookedUpIP) {
        return { error: "Error occured while trying to process the information" };
    }
    return lookedUpIP;
}
exports.getIpInfo = getIpInfo;
function getIpInfoMiddleware(opts = { DEVIP: '1.1.1.1', geoip: true }) {
    return function (req, res, next) {
        var xForwardedFor = (req.headers['x-forwarded-for'] || '').replace(/:\d+$/, '');
        var cfConnectingIp = req.headers['cf-connecting-ip'] || '';
        var incapClientIp = req.headers['incap-client-ip'] || '';
        var xSucuriClientIp = req.headers['x-sucuri-clientip'] || '';
        var ip = cfConnectingIp || incapClientIp || xSucuriClientIp || xForwardedFor;
        ip = (ip && ip.split(",").shift()) || req.connection.remoteAddress;
        if (ip.includes('::ffff:')) {
            ip = ip.split(':').reverse()[0];
        }
        if ((ip === '127.0.0.1' || ip === '::1')) {
            ip = opts.DEVIP || '1.1.1.1';
        }
        if (opts.geoip)
            req.ipInfo = Object.assign({ ip }, getIpInfo(ip));
        else
            req.ipInfo = { ip };
        next();
    };
}
exports.getIpInfoMiddleware = getIpInfoMiddleware;
