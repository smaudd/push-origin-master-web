import { src, dest } from 'gulp'
import through2 from 'through2'
import ejs from 'ejs'
import rename from 'gulp-rename'
import p from 'path'
import YAML from 'yaml'
import { readStream } from './helpers'


async function render(data) {
    return new Promise(resolve => {
        ejs.renderFile(
            `${process.cwd()}/src/templates/${data.template}.ejs`,
            data,
            {},
            function (err, str) {
                if (err) throw new Error(err)
                resolve(str)
            })
    })
}

function parseHTML() {
    return through2.obj(function (file, _, cb) {
        if (file.isBuffer()) {
            const content = file.contents.toString()
            const data = YAML.parse(content)
            render(data)
                .then(html => {
                    file.contents = Buffer.from(html)
                    cb(null, file);
                })
                .catch(err => {
                    throw new Error(err)
                })
        }
    })
}

function resolveDest() {
    return rename(function (path) {
        if (path.dirname === 'pages') {
            if (path.basename === 'index') {
                path.dirname = '/'
            } else {
                path.dirname = path.basename
            }
            path.extname = '.html'
            path.basename = 'index'
        }
        if (path.dirname.includes('entities')) {
            const dir = path.dirname.split(p.sep)
            path.dirname = dir[1]
            path.extname = '.html'
            path.basename = 'index'
        }
    })
}

function generateStatic() {
    return src('./content/**/*.yml')
        .pipe(parseHTML())
        .pipe(resolveDest())
        .pipe(dest('public/'))
}

export default generateStatic