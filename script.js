const minutesDisplay = document.querySelector('.minutes')
const secondsDisplay = document.querySelector('.seconds')

const buttonPlay = document.querySelector('.play')
const buttonPause = document.querySelector('.pause')
const buttonStop = document.querySelector('.stop')
const buttonPlus = document.querySelector('.plus')
const buttonMinus = document.querySelector('.minus')

const iconForest =  document.querySelector('.forest')
const iconRain = document.querySelector('.rain')
const iconCoffee = document.querySelector('.coffee')
const iconFireplace = document.querySelector('.fireplace')

const buttonForest = document.querySelector('.forestWrapper')
const buttonRain = document.querySelector('.rainWrapper')
const buttonCoffee = document.querySelector('.coffeeWrapper')
const buttonFireplace = document.querySelector('.fireplaceWrapper')

const htmlPage = document.querySelector('.page')
const buttonLightMode = document.querySelector('svg.lightMode')
const buttonDarkMode = document.querySelector('svg.darkMode')

const soundForest = new Audio("assets/forest.mp3")
const soundRain = new Audio("assets/rain.mp3")
const soundCoffee = new Audio("assets/coffee-shop.mp3")
const soundFireplace = new Audio("assets/fireplace.mp3")
const soundButtonPress = new Audio("https://github.com/maykbrito/automatic-video-creator/blob/master/audios/button-press.wav?raw=true")
const kitchenTimer = new Audio("https://github.com/maykbrito/automatic-video-creator/blob/master/audios/kichen-timer.mp3?raw=true")

const inputForestVolume = document.querySelector('#forestVolume')
const inputRainVolume = document.querySelector('#rainVolume')
const inputCoffeeVolume = document.querySelector('#coffeeVolume')
const inputFireplaceVolume = document.querySelector('#fireplaceVolume')

let minutes = Number(minutesDisplay.textContent)
let timerTimeOut

buttonPlay.addEventListener('click', clickButtonPlay)
buttonPause.addEventListener('click', clickButtonPause)
buttonStop.addEventListener('click', clickButtonStop)
buttonPlus.addEventListener('click', clickButtonPlus)
buttonMinus.addEventListener('click', clickButtonMinus)
iconForest.addEventListener('click', function () {
  soundForest.loop = true
  if(buttonForest.classList.contains('active')) {
    pauseButtonForest()
  } else{
  playButtonForest()
    }
  
})
iconRain.addEventListener('click', function () {
  soundRain.loop = true
  if(buttonRain.classList.contains('active')) {
    pauseButtonRain()
  } else{
  playButtonRain()
  }
})
iconCoffee.addEventListener('click', function () {
  soundCoffee.loop = true
  if(buttonCoffee.classList.contains('active')) {
    pauseButtonCoffee()
  } else{
  playButtonCoffee()
  }
})
iconFireplace.addEventListener('click', function () {
  soundFireplace.loop = true
  if(buttonFireplace.classList.contains('active')) {
    pauseButtonFireplace()
  } else{
  playButtonFireplace()
  }
})
buttonLightMode.addEventListener('click', switchMode)
buttonDarkMode.addEventListener('click', switchMode)
inputForestVolume.addEventListener('input', setAudioVolume)
inputRainVolume.addEventListener('input', setAudioVolume)
inputCoffeeVolume.addEventListener('input', setAudioVolume)
inputFireplaceVolume.addEventListener('input', setAudioVolume)

function countDown(){
  timerTimeOut = setTimeout(function() {
    let seconds = Number(secondsDisplay.textContent)
    let minutes = Number(minutesDisplay.textContent) 

    updateTimerDisplay(minutes, 0)

    
    if(seconds <= 0) {
      seconds = 60
      --minutes
    }
    
    if(minutes < 0) {
      resetControls()
      soundTimeEnd()
      return
    }

    updateTimerDisplay(minutes, String(seconds - 1))

    countDown()
  }, 1000)
}

function updateTimerDisplay(minutes, seconds) {
  minutesDisplay.textContent = String(minutes).padStart(2, "0")
  secondsDisplay.textContent = String(seconds).padStart(2, "0")
}
function updateDisplay (minutes, seconds) {
  minutesDisplay.textContent = String(minutes).padStart(2, '0')
  secondsDisplay.textContent = String(seconds).padStart(2, '0')
}

function resetTimer () {
  updateTimerDisplay(minutes, 0)
  clearTimeout(timerTimeOut)
}
function resetControls () {
  buttonPlay.classList.remove('hide')
  buttonPause.classList.add('hide')
}

function clickButtonPlay () {
  buttonPlay.classList.add('hide')
  buttonPause.classList.remove('hide')
  pressButton()
  countDown()
}
function clickButtonPause () {
  buttonPlay.classList.remove('hide')
  buttonPause.classList.add('hide')
  clearTimeout(timerTimeOut)
  pressButton()
}
function clickButtonStop () {
  resetControls()
  resetTimer()
  pressButton()
}
function clickButtonPlus () {
  let minutes = Number(minutesDisplay.textContent)
  let seconds = Number(secondsDisplay.textContent)
  updateDisplay(minutes + 5, seconds)
  pressButton()
}
function clickButtonMinus () {
  let minutes = Number(minutesDisplay.textContent)
  let seconds = Number(secondsDisplay.textContent)

  if(minutes <= 5){
    return
  }
  updateDisplay(minutes - 5, seconds)

  pressButton()
}

function pauseButtonForest () {
  soundForest.pause()
  buttonForest.classList.remove('active')
}
function playButtonForest () {
  buttonForest.classList.add('active')
  soundForest.play()
}
function pauseButtonRain () {
  soundRain.pause()
  buttonRain.classList.remove('active')
}
function playButtonRain () {
  buttonRain.classList.add('active')
  soundRain.play()
}
function pauseButtonCoffee () {
  soundCoffee.pause()
  buttonCoffee.classList.remove('active')
}
function playButtonCoffee () {
  buttonCoffee.classList.add('active')
  soundCoffee.play()
}
function pauseButtonFireplace () {
  soundFireplace.pause()
  buttonFireplace.classList.remove('active')
}
function playButtonFireplace () {
  buttonFireplace.classList.add('active')
  soundFireplace.play()
}

function setAudioVolume () {
  soundForest.volume = inputForestVolume.value
  soundRain.volume = inputRainVolume.value
  soundCoffee.volume = inputCoffeeVolume.value
  soundFireplace.volume = inputFireplaceVolume.value

}

function soundTimeEnd () {
  kitchenTimer.play()
}
function pressButton () {
  soundButtonPress.play()
}
function switchMode () {
 htmlPage.classList.toggle('darkMode')
 buttonLightMode.classList.toggle('hide')
 buttonDarkMode.classList.toggle('hide')
 pressButton()
}