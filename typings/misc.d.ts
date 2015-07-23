declare module 'stream-array' {
    interface streamify {
        (array: any[]): NodeJS.ReadableStream;
    }

    var _: streamify;
    export = _;
}

declare module 'stream-assert' {
    interface streamAssert {
        nth(n: number, assertion: Function): NodeJS.ReadWriteStream;
        first(assertion: Function): NodeJS.ReadWriteStream;
        second(assertion: Function): NodeJS.ReadWriteStream;
        last(assertion: Function): NodeJS.ReadWriteStream;
        all(assertion: Function): NodeJS.ReadWriteStream;
        length(length: number): NodeJS.ReadWriteStream;
        any(assertion: Function): NodeJS.ReadWriteStream;
        end(cb?: Function): NodeJS.ReadWriteStream;
    }

    var _: streamAssert;
    export = _;
}

declare module 'json-stable-stringify' {
    interface kvp {
        key: string,
        value: any
    }

    interface options {
        cmp?: (first: kvp, second: kvp) => number;
        cycles?: boolean;
        replacer?: (key: string, value: any) => any;
        space?: number | string;        
    }

    var _: (object: any, options?: options) => string;
    export = _
}