'use strict';
var through = require('through2');
var gulp_util_1 = require('gulp-util');
var pluginName = 'gulp-json-sort';
function default_1(options) {
    if (options === void 0) { options = {}; }
    var _a = options.spaces, spaces = _a === void 0 ? 0 : _a, replacer = options.replacer, compare = options.compare;
    function onFile(file, enc, done) {
        if (file.isStream()) {
            this.emit('error', new gulp_util_1.PluginError(pluginName, 'Streams not supported'));
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
exports.default = default_1;
