'use strict';
import * as through from 'through2';
import * as assert from 'stream-assert';
import * as stringify from 'json-stable-stringify';
import { File } from 'gulp-util';
import test from './test-stream';
import sort from '../index';
import 'should';

function testObjects(...objs: any[]) {
    return test(...objs.map(o => new Buffer(JSON.stringify(o))));
}

function contentsEqual(expected: string) {
    return function (file: File) {
        file.contents.toString().should.eql(expected);
    };
}

describe('gulp-json-sort', () => {
    it('should error on stream', done => {
        test(through())
            .pipe(sort())
            .on('error', (err: Error) => {
                err.message.should.eql('Streams not supported');
                done();
            });
    });

    it('should pass null files', done => {
        test(null)
            .pipe(sort())
            .pipe(assert.length(1))
            .pipe(assert.end(done));
    });
});