document.addEventListener('DOMContentLoaded', () => {

const startBtn = document.querySelector('button')
const grid = document.querySelector('.grid')
const displaySquares = document.querySelectorAll('.previous-grid div')
let squares = Array.from(grid.querySelectorAll('div'))
const width = 10
const height =20 
let currentPosition = 4
let timerId

 //assign functions to keyCodes
 function control(e) {
    if(e.keyCode === 37) {
      moveLeft()
    } else if (e.keyCode === 38) {
      rotate()
    } else if (e.keyCode === 39) {
      moveRight()
    } else if (e.keyCode === 40) {
      moveDown()
    }
  }
  document.addEventListener('keyup', control)





// The tetrominoes
const lTetromino = [
    [1, width+1, width*2+1, 2],
    [width, width+1, width+2, width*2+2],
    [1, width+1, width*2+1, width*2],
    [width, width*2, width*2+1, width*2+2]
    
]

const zTetromino = [
    [0,width,width+1,width*2+1],
    [width+1, width+2,width*2,width*2+1],
    [0,width,width+1,width*2+1],
    [width+1, width+2,width*2,width*2+1]
  ]

  const tTetromino = [
    [1,width,width+1,width+2],
    [1,width+1,width+2,width*2+1],
    [width,width+1,width+2,width*2+1],
    [1,width,width+1,width*2+1]
  ]

  const oTetromino = [
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1]
  ]

  const iTetromino = [
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3],
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3]
  ]

 const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]


// Radomly select Tetromino
let random = Math.floor(Math.random()*theTetrominoes.length)
let currentRotation = 0
let current = theTetrominoes[random][currentRotation]


// draw the shape
function draw() {
    current.forEach( index => ( 
        squares[currentPosition + index].classList.add('block')
    ))
}

// undraw the shape
function undraw() {
    current.forEach( index => (
        squares[currentPosition + index].classList.remove('block')
    ))
}

// move down the shape
function moveDown() {
    undraw()
    currentPosition = currentPosition += width
    draw()
    //freeze()
}

// move left an prevent collisions with shapes moving left
function moveRight() {
    undraw()
    const isAtRightEdge = current.some(index => (currentPosition + index) % width === -1)
    if(!isAtRightEdge) currentPosition +=1
    if (current.some(index => squares[currentPosition + index].classList.contains('block2'))) { 
        currentPosition -=1
    }
    draw()
}

function moveLeft() {
    undraw()
    const isAtLeftEdge = current.some(index =>(currentPosition + index) % width === 0)
    if(!isAtLeftEdge) currentPosition -=1
    if (current.some(index => squares[currentPosition + index].classList.contains('block2'))) {
        currentPosition +=1
    }
    draw()
}

// rotate Tetromino
function rotate() {
    undraw()
    currentRotation ++
    if (currentRotation === current.length) {
        currentRotation = 0
    }
    current = theTetrominoes[random][currentRotation]
    draw()
}

draw()
// show previous tetromino is displaySquares
const displayWidth = 4
const displayIndex = 0
let nextRandom = 0

const smallTetrominos = [
    [1, displayWidth+1, displayWidth*2+1, 2], //lTetromino
    [0, displayWidth, displayWidth+1, displayWidth*2+1], //zTetromino
    [1, displayWidth, displayWidth+1, displayWidth+2], //tTetromino
    [0, 1, displayWidth, displayWidth+1], //oTetromino
    [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1] //iTetromino
  ]

//display the shape in the mini-grid display
function displayShape() {
    //remove any trace of a tetromino form the entire grid
    displaySquares.forEach(square => {
      square.classList.remove('block')
      
    })
    smallTetrominos[nextRandom].forEach( index => {
      displaySquares[displayIndex + index].classList.add('block')
      
    })
  }
//freeze function
function freeze() {
    if(current.some(index => squares[currentPosition + index + width].classList.contains('block3')
    || squares[currentPosition + width].classList.contains('block2'))) {
      current.forEach(index => squares[index + currentPosition].classList.add('block2'))

      random = nextRandom
      nextRandom = (Math.random() * theTetrominoes.length)
      current = theTetrominoes[random][currentRotation]
      currentPosition = 4
      draw()
      displayShape()
      
    }
  }
startBtn.addEventListener('click', () => {
    if(timerId) {
        clearInterval(timerId)
        timerId = null
    } else {
        draw()
        timerId = setInterval(moveDown, 1000)
        nextRandom = Math.floor(Math.random()*theTetrominoes.length)
        displayShape()
    }
})
}

)  