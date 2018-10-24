import { serverInfo } from './sockets/serverInfo'

class ControllerGuessingResults extends Phaser.State {
  constructor () {
    super()
    // construct stuff here, if needed
  }

  preload () {
    // load stuff here, if needed
  }

  create () {    
    let gm = this.game
    let socket = serverInfo.socket
    let div = document.getElementById("main-controller")
    let canvas = document.getElementById("canvas-container")

    // the vip can continue to the next cycle (or game over) whenever he or she pleases
    // this allows for skipping "boring" animations or reveal phases
    // but also for pausing the game (by NOT pressing it) if someone needs food/a bathroom break/fresh air
    if(serverInfo.vip) {
      // if it's the last drawing, go to game over screen
      if(serverInfo.drawing.lastDrawing) {
        let p1 = document.createElement("p")
        p1.innerHTML = "That was it for this round! At the game over screen, you can play another round or stop the game.";
        div.appendChild(p1)

        let btn1 = document.createElement("button")
        btn1.innerHTML = "Go to game over"

        btn1.addEventListener('click', function(event) {
          // tell the server that we want to continue
          socket.emit('timer-complete', { nextState: 'Over', certain: true })
        })
        div.appendChild(btn1)
      } else {
        let p1 = document.createElement("p")
        p1.innerHTML = "Tap the button below whenever you want to start the next drawing";
        div.appendChild(p1)

        let btn1 = document.createElement("button")
        btn1.innerHTML = "Load next drawing!"

        btn1.addEventListener('click', function(event) {
          // tell the server that we want to continue
          socket.emit('timer-complete', { nextState: 'Guessing', certain: true })
        })
        div.appendChild(btn1)
      }
    } else {
        let p1 = document.createElement("p")
        p1.innerHTML = "That was it for this round! Please wait for the VIP to start the next round.";
        div.appendChild(p1)
    } 

    console.log("Controller Guessing Results state");
  }

  update () {
  }
}

export default ControllerGuessingResults
