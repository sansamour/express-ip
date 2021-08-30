import * as geoip from 'geoip-country';
export declare function getIpInfo(ip: string): geoip.Lookup | {
    error: string;
};
export declare function getIpInfoMiddleware(opts?: {
    DEVIP: string;
    geoip: boolean;
}): (req: any, res: any, next: any) => void;
