import { src, dest } from 'gulp'
import babel from 'gulp-babel'

function compileJS() {
    return src('src/**/*.js')
        .pipe(babel({
            presets: [
                [
                    '@babel/preset-env',
                    {
                        modules: false,
                        loose: true,
                    }
                ]
            ],
        }))
        .pipe(dest('public/scripts'))
}

export default compileJS