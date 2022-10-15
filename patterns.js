
function ascending(c, d, f, g, e) {
    if(!g.paused) g.pause()
    c.play()
    setTimeout(() => {
      c.pause()
      f.play()
  
    }, 800)
    setTimeout(() => {
      f.pause()
      d.play()
    }, 1200)
    setTimeout(() => {
      d.pause()
      e.play()
    }, 1800)
    setTimeout(() => {
      e.pause()
      g.play()
    }, 2600)
  }
  /**Let's create a music pattern**/
  function playPattern() {
    const c = document.querySelector(`audio[data-key="67"]`)
    const d = document.querySelector(`audio[data-key="68"]`)
    const f = document.querySelector(`audio[data-key="70"]`)
    const e = document.querySelector(`audio[data-key="71"]`)
    const g = document.querySelector(`audio[data-key="69"]`)
    ascending(c, d, f, g, e)
  }
  