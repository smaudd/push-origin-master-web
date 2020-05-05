import { src, dest } from 'gulp'

function copyAssets() {
    return src('src/assets/**/*')
        .pipe(dest('public/assets'))
}

export default copyAssets