
//region Imports
const { dest, parallel, watch } = require('gulp');
const Browserify = require('browserify');
const VinylSource = require('vinyl-source-stream');
const VinylBuffer = require('vinyl-buffer');
const Rename = require('gulp-rename');
const Babelify = require('babelify');
const Del = require('del');
const SourceMaps = require('gulp-sourcemaps');
const Uglify = require('gulp-uglify');
//endregion

const entries = [
    'EZWrap.js'
];

//region Maintenance Tasks

/**
 * Clean vendor and generated files
 */
exports.clean = async function clean() {
    await Del([
        'dist/*'
    ]);
};

//endregion

//region App Tasks

// Initialize the browserify instance
const appBrowserify = Browserify({
    debug: true
});

appBrowserify.external('util');
appBrowserify.require('./EZWrap.js', { expose: 'ezwrap' });


// Convert our fancy syntax for use in old stuff
appBrowserify.transform(Babelify);

/**
 * Glues all the app sources together into a monolith
 */
exports.bundleApp = function bundleApp() {
    return appBrowserify
        .bundle()
        .on('error', (err) => { console.error('Browserify Error:', err.message, err.stack); })
        .pipe(VinylSource('ezwrap.js'))
        .pipe(dest('dist'))
        .pipe(VinylBuffer())
        .pipe(SourceMaps.init())
        .pipe(Rename('ezwrap.min.js'))
        .pipe(Uglify())
        .pipe(SourceMaps.write('./'))
        .pipe(dest('dist'));
};

appBrowserify.on('update', exports.bundleApp);
appBrowserify.on('log', function(summary) { console.log(' > Updated app bundle:', summary); });

//endregion

//region Watch Tasks

exports.watchJs = function watchJs() {
    watch(entries, exports.bundleApp);
};

//endregion

//region Main tasks
exports.build = parallel([
    exports.bundleApp
]);

// Default, like dev mode
exports.default = parallel([
    // Build everything
    exports.build,

    // Watch for changes #devmode
    exports.watchJs
]);
//endregion