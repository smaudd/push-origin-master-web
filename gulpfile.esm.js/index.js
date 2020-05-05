import { parallel, watch, task, series } from 'gulp'
import bs from 'browser-sync'
import html from './html'
import assets from './assets'
import minimist from 'minimist'
import scripts from './scripts'
import css from './css'
import del from 'del'

const argv = minimist(process.argv.slice(2))
const reload = bs.reload


function server() {
    if (argv.dev) {
        bs.init({
            server: {
                baseDir: './public'
            },
            notify: false,
            open: false,
        })
    }
    return
}

function recompile(path) {

    console.log('Changed', path)
    
    if (path.includes('.js')) {
        scripts()
    }

    if (path.includes('.ejs') || path.includes('.yml')) {
        html()
    }

    if (path.includes('.css')) {
        css()
    }

    if (path.includes('assets')) {
        assets()
    }

    reload()
}

if (argv.dev) {
    const sourceWatcher = watch(['./src/', './content'])
    sourceWatcher.on('change', recompile)
    sourceWatcher.on('add', recompile)
    sourceWatcher.on('unlink', recompile)
    sourceWatcher.on('addDir', recompile)
    sourceWatcher.on('unlinkDir', recompile)
}

function clean() {
    return del(['public'])
}

task('build', series(clean, parallel(html, scripts, css, assets)))

export default parallel(server, html, scripts, css, assets)
