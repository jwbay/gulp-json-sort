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

    it('should sort json', done => {
        let obj = { z: 0, a: 0, c: 0, b: 0, d: 0, f: 0, e: 0 }
        testObjects(obj)
            .pipe(sort())
            .pipe(assert.first(contentsEqual('{"a":0,"b":0,"c":0,"d":0,"e":0,"f":0,"z":0}')))
            .pipe(assert.end(done));
    });

    it('should pass through comparator', done => {
        testObjects({ a: 0, c: 0, b: 0, d: 0, f: 0, e: 0 })
            .pipe(sort({ cmp: (left, right) => left.key < right.key ? 1 : -1 }))
            .pipe(assert.first(contentsEqual('{"f":0,"e":0,"d":0,"c":0,"b":0,"a":0}')))
            .pipe(assert.end(done));
    });

    it('should pass through spaces', done => {
        testObjects({ b: 0, a: 0 })
            .pipe(sort({ space: 2 }))
            .pipe(assert.first(contentsEqual('{\n  "a": 0,\n  "b": 0\n}')))
            .pipe(assert.end(done));
    });

    it('should pass through replacer', done => {
        testObjects({ b: 1, a: 2 })
            .pipe(sort({ replacer: (k, v) => k ? v + 5 : v }))
            .pipe(assert.first(contentsEqual('{"a":7,"b":6}')))
            .pipe(assert.end(done));
    });
});