declare function initialize(): {
    PLATFORM: any;
};
declare function stop(): void;
export default function (configure: any): {
    initialize: typeof initialize;
    stop: typeof stop;
    start: (headers?: any) => Promise<{}>;
};
export {};
