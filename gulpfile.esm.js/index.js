import { parallel, watch } from 'gulp'
import bs from 'browser-sync'
import html from './html'
import assets from './assets'
import minimist from 'minimist'
import scripts from './scripts'
import css from './css'

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

const sourceWatcher = watch(['./src/', './content'])
sourceWatcher.on('change', recompile)
sourceWatcher.on('add', recompile)
sourceWatcher.on('unlink', recompile)
sourceWatcher.on('addDir', recompile)
sourceWatcher.on('unlinkDir', recompile)

export default parallel(server, html, scripts, css, assets)
