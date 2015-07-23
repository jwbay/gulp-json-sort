'use strict';
import * as through from 'through2';
import { File, PluginError } from 'gulp-util';

interface IKeyValuePair {
    key: string,
    value: any
}

interface IOptions {
    spaces?: number | string;
    replacer?: (key: string, value: any) => any;
    compare?: (first: IKeyValuePair, second: IKeyValuePair) => number;
}

const pluginName = 'gulp-json-sort';

export default function (options: IOptions = {}) {
    let {
        spaces = 0,
        replacer,
        compare
    } = options;
    
    function onFile(file: File, enc: string, done: Function) {
        if (file.isStream()) {
            this.emit('error', new PluginError(pluginName, 'Streams not supported'));
            return done();
        }

        if (file.isNull()) {
            this.push(file);
            return done();
        }

        this.push(file);
        return done();
    }

    return through.obj(onFile);
}
