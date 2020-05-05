console.log('hola!')

const b = document.querySelector('#btn')

b.addEventListener('click', () => {
    import('./components/test.js').then(n => {
        n.default()
    })
})