import streamify from 'stream-array';
import { File } from 'gulp-util';

export default function createStream(...fileContents: any[]) {
    var i = 0;

    function create(contents: any) {
        if (typeof contents !== 'string') {
            contents = JSON.stringify(contents);
        }

        return new File({
            cwd: '/home/contra/',
            base: '/home/contra/test',
            path: '/home/contra/test/file' + (i++).toString() + '.json',
            contents: new Buffer(contents),
            stat: { mode: 0x1B6 }
        });
    }

    return streamify(fileContents.map(create));
};