
function playSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`)
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`)
    if(!audio) return
    audio.currentTime = 0
    audio.play()
    if(!key.classList.contains('playing')){
      key.classList.add('playing')
    }
  }
  function clickSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.target.dataset.key}"]`)
    const key = document.querySelector(`.key[data-key="${e.target.dataset.key}"]`)
    if(!audio) return
    audio.currentTime = 0
    audio.play()
    if(!key.classList.contains('playing')){
    key.classList.add('playing')
    }
  }
  
  function clickChilds(e) {
    const audio = document.querySelector(`audio[data-key="${e.target.dataset.key}"]`)
    if(!audio) return
    audio.currentTime = 0
    audio.play()
  }
  function removeTransition(e) {
  if(!e.target.classList.contains('playing')) return 
  e.target.classList.remove('playing')
  }
  
  const keys = document.querySelectorAll('.key')
  const keyChildren = document.querySelectorAll('.key > *')
  keys.forEach(key => key.addEventListener('transitionend', removeTransition))
  
  window.addEventListener('keydown', playSound)
  window.addEventListener('keyup', removeTransition)
  window.addEventListener('mouseup', removeTransition)
  window.addEventListener('touchend', removeTransition)
  // Fix ux issues with keys
  keys.forEach(key => key.addEventListener('click', (e) => clickSound(e)))
  keyChildren.forEach(keyKid => keyKid.addEventListener('click', (e) => {
    e.target.setAttribute('data-key', e.target.parentElement.dataset.key )
  }))