import * as streamify from 'stream-array';
import { File } from 'gulp-util';

export default function (...fileContents: Array<Buffer | NodeJS.ReadWriteStream>) {
    var i = 0;

    function create(contents: any) {
        return new File({
            contents: contents
        });
    }

    return streamify(fileContents.map(create));
};