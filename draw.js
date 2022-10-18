const canvas = document.querySelector('#draw')
const ctx = canvas.getContext('2d')

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  ctx.strokeStyle = '#BADA55'
  ctx.lineJoin = 'round'
  ctx.lineCap = 'round'
  ctx.lineWidth = 100
  ctx.globalCompositeOperation = 'lighten'

  let isDrawing = false
  let playSong = false
  let lastX = 0
  let lastY = 0
  let hue = 0
  let direction = true

  function draw(e){
    if(!isDrawing){
      return //stop from running when not mousedown
    }
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`
    ctx.beginPath()
    // start from
    ctx.moveTo(lastX, lastY)
    // go to
    ctx.lineTo(e.offsetX, e.offsetY)
    ctx.stroke()
    lastX = e.offsetX
    lastY = e.offsetY
    hue++
    if(hue >= 360){
      hue = 0
    }
    if(ctx.lineWidth >= 100 || ctx.lineWidth <=1){
      direction = !direction
    }if(direction){
      ctx.lineWidth++
    } else {
      ctx.lineWidth--
    }

    // console.log(e)
  }

  // play buttons
  const toggle = document.querySelector('.toggle')
  const clear = document.querySelector('.clear')
  const save = document.querySelector('.save')
  const del = document.querySelector('.delete')
  const pic = document.querySelector('.opacity .pic')
 // songs
 const happySong = document.querySelector('#song')
 const mellowSong = document.querySelector('#mellow-song')
 const energySong = document.querySelector('#energy-song')
 let song = happySong

  function updateButton() {
    const icon = this.paused ? '► Play Song' : '❚ ❚ Pause Song'
    toggle.textContent = icon
   }
  function playTheSong(song) {
    playSong = !playSong
    if(playSong) {
      song.play()
      song.addEventListener('play', updateButton)
    } else {
      song.pause()
      song.addEventListener('pause', updateButton)
    }
  }
  function paintToPicture() {
    const data = canvas.toDataURL('image/png', 0.5)
    const link = document.createElement('a')
    console.log(link.href)
    link.href = data
    console.log(link.href)
    link.setAttribute('download', 'drawing')
    link.innerHTML = `<img width="200" src="${data}" alt="Your drawing" />`
    pic.insertAdjacentElement('beforeend', link)
  }

  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
  }
  function deletePics() {
    const images = document.querySelectorAll('.pic > *')
   
    images.forEach(image => image.remove())
  }

  // Song Buttons
const mellow = document.querySelector('.mellow')
const happy = document.querySelector('.happy')
const energy = document.querySelector('.energy')
 
  // EVENTS
  toggle.addEventListener('click', () => playTheSong(song))
  save.addEventListener('click', paintToPicture)
  clear.addEventListener('click', clearCanvas)
  del.addEventListener('click', deletePics)

  mellow.addEventListener('click', () => {
    canvas.style.backgroundColor = 'hsl(228, 100%, 50%)'
    ctx.globalCompositeOperation = 'soft-light'
    song.pause()
    song = mellowSong
    song.play()
    updateButton()
  })
  happy.addEventListener('click', () => {
    canvas.style.backgroundColor = '#ffffff'
    ctx.globalCompositeOperation = 'lighten'
    song.pause()
    song = happySong
    song.play()
    updateButton()
  })
  energy.addEventListener('click', () => {
    canvas.style.backgroundColor = 'hsl(166, 100%, 50%)'
    ctx.globalCompositeOperation = 'difference'
    song.pause()
    song = energySong
    song.play()
    updateButton()
  })

  canvas.addEventListener('mousedown', (e) =>{
    isDrawing = true
    lastX = e.offsetX
    lastY = e.offsetY
  })
  canvas.addEventListener('mousemove', (e) => {
    draw(e)
  })
  canvas.addEventListener('mouseup', () => {
    isDrawing = false
  })
  canvas.addEventListener('mouseout', () => {
    isDrawing = false
  })

// Touch Events

function touchDraw(e, i){
e.preventDefault()
    if(!isDrawing){
        return //stop from running when not mousedown
    }
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`
    ctx.beginPath()
    // start from
    ctx.moveTo(lastX, lastY)
    // go to
    ctx.lineTo(e.touches[i].clientX, e.touches[i].clientY)
    ctx.stroke()
    lastX = e.touches[i].clientX
    lastY = e.touches[i].clientY
    // alert(lastX, lastY)
    hue++
    if(hue >= 360){
        hue = 0
    }
    if(ctx.lineWidth >= 100 || ctx.lineWidth <=1){
        direction = !direction
    }if(direction){
        ctx.lineWidth++
    } else {
        ctx.lineWidth--
    }
}
// Touch Events
canvas.addEventListener('touchend', () => {
    isDrawing = false
  }, false)
  canvas.addEventListener('touchcancel', () => {
    isDrawing = false
  }, false)
canvas.addEventListener('touchstart', (e) => {
    // Iterate through the touch points and log each screenX/Y coordinate.
    // The unit of each coordinate is CSS pixels.
    isDrawing = true
    for (let i = 0; i < e.touches.length; i++) {
      lastX = e.touches[i].clientX
      lastY = e.touches[i].clientY
      touchDraw(e, i)
    }
  }, false);

canvas.addEventListener('touchmove', (e) => {
  isDrawing = true
    for (let i = 0; i < e.touches.length; i++) {
      lastX = e.touches[i].clientX
      lastY = e.touches[i].clientY
      touchDraw(e, i)
    }
}, false);