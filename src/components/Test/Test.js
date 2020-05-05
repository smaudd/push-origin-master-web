export default function () {
    const a = document.querySelector('#test')
    setInterval(() => {
        a.innerHTML = Math.random()
    }, 1500)
}