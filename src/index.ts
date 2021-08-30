import * as geoip from 'geoip-country'

export function getIpInfo (ip:string,opts?:any) {        	
	var lookedUpIP = geoip.lookup(ip);

	if (!lookedUpIP){
		return { error: "Error occured while trying to process the information" }
	}
	return lookedUpIP;
}

export function getIpInfoMiddleware (opts={DEVIP:'1.1.1.1'}){
	return function (req:any, res:any, next:any) {
		var xForwardedFor = (req.headers['x-forwarded-for'] || '').replace(/:\d+$/, '');
		var cfConnectingIp = req.headers['cf-connecting-ip'] || '';
		var incapClientIp = req.headers['incap-client-ip'] || '';
		var xSucuriClientIp = req.headers['x-sucuri-clientip'] || '';
		var ip = cfConnectingIp || incapClientIp || xSucuriClientIp || xForwardedFor            
		ip = (ip && ip.split(",").shift()) || req.connection.remoteAddress;
		if (ip.includes('::ffff:')) {
			ip = ip.split(':').reverse()[0]
		}	
		if ((ip === '127.0.0.1' || ip === '::1')) {
			ip = opts.DEVIP || '1.1.1.1'
		}
		req.ipInfo = { ip, ...getIpInfo(ip,opts) };
		next();
	}
}