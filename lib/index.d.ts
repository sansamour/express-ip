import * as geoip from 'geoip-country';
export declare function getIpInfo(ip: string, opts?: any): geoip.Lookup | {
    error: string;
};
export declare function getIpInfoMiddleware(opts?: {
    DEVIP: string;
}): (req: any, res: any, next: any) => void;
