# gulp-json-sort [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]
[Gulp](http://gulpjs.com/) plugin for deterministic sorting of JSON files. Supports deep structures, custom compare functions, replacers, and formatting options.

Thin wrapper over [substack's](https://github.com/substack) [json-stable-stringify](https://github.com/substack/json-stable-stringify), which does all the hard work.

## Usage

This plugin is authored in ES6, so until Node picks up ES6 module support you'll need to pluck the default property from the require'd import.

```javascript
var gulp = require('gulp');
var sortJSON = require('gulp-json-sort').default;

gulp.task('sort-json', function() {
    return gulp.src('./**/*.json')
        .pipe(sortJSON({ space: 2 }))
        .pipe(gulp.dest('./'));
});
```

By default (with no compare function provided), sorting happens alphabetically by key. 

If a file contains invalid JSON, a parse error will be emitted on the stream.

Newlines in the output are always LF. Pipe the results through [gulp-eol](https://www.npmjs.com/package/gulp-eol) as needed.

## API

```typescript
sortJSON(options?: {
    cmp?: (left: { key: string, value: any }, right: { key: string, value: any }) => number,
    cycles?: boolean,
    replacer?: (key: string, value: any) => any,
    space?: number | string
}); 
```

See [json-stable-stringify](https://github.com/substack/json-stable-stringify) for details and behavior for each option; the params are passed straight through.

## License
MIT License (Expat)

[npm-url]: https://npmjs.org/package/gulp-json-sort
[npm-image]: http://img.shields.io/npm/v/gulp-json-sort.svg?style=flat
[travis-url]: https://travis-ci.org/jwbay/gulp-json-sort
[travis-image]: https://travis-ci.org/jwbay/gulp-json-sort.svg?branch=master