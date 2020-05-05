import { src, dest } from 'gulp'
import autoprefixer from 'gulp-autoprefixer'

function compileCSS() {
    return src('src/styles/*.css')
        .pipe(autoprefixer())
        .pipe(dest('public/styles'))
}

export default compileCSS