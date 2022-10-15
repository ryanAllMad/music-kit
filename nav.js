const menuToggle = document.querySelector('.menu-toggle')
const menu = document.querySelector('.menu')
const close = document.querySelector('.close')

function toggleMenu() {
if(!menu.classList.contains('show')){
    menu.classList.add('show')
} else {
    menu.classList.remove('show')
}
}

menuToggle.addEventListener('click', toggleMenu)
close.addEventListener('click', () => {
    menu.classList.remove('show')
})