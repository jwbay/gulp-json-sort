'use strict';
var through = require('through2');
var stringify = require('json-stable-stringify');
var gulp_util_1 = require('gulp-util');
var pluginName = 'gulp-json-sort';
function default_1(options) {
    return through.obj(function (file, enc, done) {
        if (file.isStream()) {
            this.emit('error', new gulp_util_1.PluginError(pluginName, 'Streams not supported'));
            this.push(file);
            return done();
        }
        if (file.isNull()) {
            this.push(file);
            return done();
        }
        try {
            var jsonString = file.contents.toString();
            var parsedObject = JSON.parse(jsonString);
            var sortedString = stringify(parsedObject, options);
            file.contents = new Buffer(sortedString);
        }
        catch (e) {
            this.emit('error', e);
        }
        this.push(file);
        return done();
    });
}
exports.default = default_1;
