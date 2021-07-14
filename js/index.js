const $video = document.querySelector('#video')
const $play = document.querySelector('#play')
const $pause = document.querySelector('#pause')
const $forward = document.querySelector('#forward')
const $backward = document.querySelector('#backward')
const $progress = document.querySelector('#progress')
const $selector = document.querySelector('.selector')
const $bar = document.querySelector('.progress-bar')

$play.addEventListener('click', () => {
  $video.play()
  $play.hidden = true
  $pause.hidden = false
  $backward.hidden = false
  $forward.hidden = false
})

$pause.addEventListener('click', () => {
  $video.pause()
  $play.hidden = false
  $pause.hidden = true
})

$backward.addEventListener('click', () => {
  $video.currentTime -= 10
})

$forward.addEventListener('click', () => {
  $video.currentTime += 10
})

$video.addEventListener('loadedmetadata', () => {
  $progress.max = $video.duration
})

$progress.addEventListener('input', () => {
  $video.currentTime = $progress.value
  // Mover el selector
  let currentPercentage = (100 * $video.currentTime) / $video.duration
  $selector.style.left = currentPercentage + '%'
  // Actualizar el tiempo en el selector
  updateTime()
  // Actualizar barra de progreso
  updateBar()
})

$video.addEventListener('timeupdate', () => {
  $progress.value = $video.currentTime
  // Mover el selector
  let currentPercentage = (100 * $video.currentTime) / $video.duration
  $selector.style.left = currentPercentage + '%'
  // Actualizar el tiempo en el selector
  updateTime()
  // Actualizar barra de progreso
  updateBar()
})

function updateTime() {
  let firstNum  = $progress.value < 10
                ? 0
                : Math.floor($progress.value / 10)
  let lastNum = $progress.value < 10
              ? Math.floor($progress.value)
              : Math.floor($progress.value - 10 * firstNum)
  $selector.innerHTML = `0:${firstNum}${lastNum}`
}

function updateBar() {
  let currentPercentage = (100 * $video.currentTime) / $video.duration
  $bar.style['inline-size'] = currentPercentage + '%'
}