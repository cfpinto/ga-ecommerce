const mix = require('laravel-mix')
require('dotenv').config()

if (process.env.NODE_ENV == 'production') {
    mix.js('src/index.js', 'dist/ga-tracker.min.js')
        .setPublicPath('dist')
} else {
    mix.js('src/index.js', 'demo/js/ga-tracker.js')
        .sass('node_modules/bootstrap/scss/bootstrap.scss', 'css/bootstrap.css')
        .setPublicPath('demo')
        .sourceMaps()
        .version()
        .browserSync({
            proxy: 'localhost:8080',
            files: ['demo/**/*']
        })
}
