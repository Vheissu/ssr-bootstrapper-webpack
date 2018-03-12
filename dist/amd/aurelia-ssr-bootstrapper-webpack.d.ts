export default function (configure: any): {
    initialize: () => {
        PLATFORM: any;
    };
    stop: () => void;
    start: (headers?: any) => Promise<{}>;
};
