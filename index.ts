'use strict';
import * as through from 'through2';
import * as stringify from 'json-stable-stringify';
import { File, PluginError } from 'gulp-util';

interface IKeyValuePair {
    key: string,
    value: any
}

interface IOptions {
    cmp?: (first: IKeyValuePair, second: IKeyValuePair) => number;
    cycles?: boolean;
    replacer?: (key: string, value: any) => any;
    space?: number | string;      
}

const pluginName = 'gulp-json-sort';

export default function (options?: IOptions) {
    function onFile(file: File, enc: string, done: Function) {
        if (file.isStream()) {
            this.emit('error', new PluginError(pluginName, 'Streams not supported'));
            this.push(file);
            return done();
        }

        if (file.isNull()) {
            this.push(file);
            return done();
        }

        try {
            const jsonString = file.contents.toString();
            const parsedObject = JSON.parse(jsonString);
            const sortedString = stringify(parsedObject, options);
            file.contents = new Buffer(sortedString);
        } catch (e) {
            this.emit('error', e);
        }
        
        this.push(file);
        return done();
    }

    return through.obj(onFile);
}
