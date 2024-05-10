



//////////checks and changes game turn
const turn = function turn () {
  let turn = ""
  const resetTurn = () => turn = ""
  const getTurn = () => turn
  const setTurn = function(decision) {
    if (turn == "circle") {
      turn = "exe"
    } else if (turn == "exe") {
      turn = "circle"
    } else {
      turn = `${decision}`
    }
  } 
  return { getTurn, setTurn, resetTurn}
} ()









///asigns all nine squares of the DOM numeric values
const assignDOM = function () {
    one = getDOM("1")
    two = getDOM("2")
    three = getDOM("3")
    four = getDOM("4")
    five = getDOM("5")
    six = getDOM("6")
    seven = getDOM("7")
    eight = getDOM("8")
    nine = getDOM("9")
    const array = [one,two,three,four,five,six,seven,eight,nine]
    array.forEach(element => {
      eventlistener(element)
    })
    return [one,two,three,four,five,six,seven,eight,nine]
}  ()





////creates the dom and gives it class
function getDOM(name) {
  const first= document.createElement("div")
  first.classList.toggle("blocks")
  first.setAttribute("data-number" , `${name}`)
  const parent = document.querySelector(".father")
  parent.appendChild(first)
  return first
}

///event listener for blocks
function eventlistener(one) {
  one.addEventListener("click", () => {
    if (squareUsed(one) == "true") {
    if (turn.getTurn() == "exe") {
      one.textContent = "X"
      turn.setTurn()
      moves.addMoveExe()
      moves.announceWin() 
    } else if (turn.getTurn() == "circle") {
      one.textContent = "O"
      turn.setTurn()
      moves.addMoveCircle()
      moves.announceWin()
      
    }}
  })
}

//////returns text content values and assigns lines for blocks

const getValues = function() {
  const textContent = []
  const elements = assignDOM
  elements.forEach(element => {
    const value =  element.textContent
    textContent.push( value)
    
  })
  const first_row = [elements[0],elements[1],elements[2]]
  const second_row = [elements[3],elements[4],elements[5]]
  const third_row = [elements[6],elements[7],elements[8]]
  const first_vertical = [elements[0],elements[3],elements[6]]
  const second_vertical = [elements[1],elements[4],elements[7]]
  const third_vertical =  [elements[2],elements[5],elements[8]]
  return {first_row, second_row , third_row ,textContent , first_vertical, second_vertical , third_vertical}
}

///////////////checks for winning moves
const winningMoves =  function() {
  ////checks for straight wins
  const straight = (row,type) => {
    let count = ""
    row.forEach(element => {
      if (element.textContent == `${type}`) {
        count++
      }
    })
    if ( count == 3) {
      return "WIN"
    }
  } 
   ///checks for diagonal wins
  const diagonal = (row1,row2,row3,type) => {
    if (row1[0].textContent == type && row2[1].textContent == type && row3[2].textContent == type)  {
      return "WIN"
    } else if (row1[2].textContent == type && row2[1].textContent == type && row3[0].textContent == type) {
      return "WIN"
    }
  } 
  const tie = () => {
    const array = assignDOM
    const areFull = (element) => element.textContent != "" 
    if(array.every(areFull)) {
      return "full"
    }
  }

  return {straight,diagonal,tie}
}

///check if winning combination
const checkWins = function(moves_played,type) {
    const first_row = getValues().first_row
    const second_row = getValues().second_row
    const third_row =  getValues().third_row
    const first_vertical = getValues().first_vertical
    const second_vertical = getValues().second_vertical
    const third_vertical  = getValues().third_vertical
    ////values contains more than 3 x or 0 nad theyre all in differnet lin
  if (moves_played >= 3 ) {
  let result1 = () => {
     let a1 = winningMoves().straight(first_row,`${type}`)
     let a2 = winningMoves().straight(second_row,`${type}`)
     let a3 = winningMoves().straight(third_row, `${type}`)
     let a4= winningMoves().straight(first_vertical, `${type}`)
     let a5 = winningMoves().straight(second_vertical, `${type}`)
     let a6 = winningMoves().straight(third_vertical, `${type}`)
     let a7 = winningMoves().diagonal(first_row,second_row,third_row,`${type}`)
    let array = [a1,a2,a3,a4,a5,a6,a7] 
    function checkWin(element) {
      return element == "WIN";
    }
    if (array.find(checkWin) ) {
      return "Victory"
    } else if (winningMoves().tie() == "full") {
      return "Tie"}
  }
  return result1()
  
} 
}

///////////checks for minimum requeirements for a win 
const moves = function() {
  let moves_played_circle = 0
  let moves_played_exe = 0
  const resetCircle = () => moves_played_circle = 0
  const resetExe = () => moves_played_exe = 0
  const addMoveCircle = () => ++moves_played_circle
  const addMoveExe = () =>  ++moves_played_exe
  const announceWin = function() {
    const circle = checkWins(moves_played_circle,"O") 
    const exe = checkWins(moves_played_exe,"X") 
    if(circle == "Victory" ) {
        return result().winner("O")
      } else if (circle == "Tie" || exe == "Tie"){ return result().tie()}
      else if (exe == "Victory"){return result().winner("X") }

  }
  return {addMoveCircle, addMoveExe,announceWin,resetCircle,resetExe}
}() 

//////selects users turn 
const selectTurn = function() {
  const button_exe =  document.querySelector(".button-x")
  const button_circle =  document.querySelector(".button-o")
    button_exe.addEventListener("click", () => {
      turn.setTurn("exe")
      setNames("X","O")
    })
    button_circle.addEventListener("click", () => {
      turn.setTurn("circle")
      setNames("O","X")
    })

  
} ()

////checks if square has been used 
const squareUsed = function(square) {
  if(square.textContent == "" ) {
    return "true"
  } 
}


///restarts game
const clean = function() {
  const button = document.querySelector(".butto")
  button.addEventListener("click",(element) => {
    array = assignDOM
    assignDOM.forEach(element => {
      element.textContent = ""
    })
    turn.resetTurn()
    moves.resetCircle()
    moves.resetExe()
    result().clean()
  const p = document.querySelector(".name-1")
   const p2 = document.querySelector(".name-2")
   p.textContent = ""
   p2.textContent = ""

  })
}()

//display player names
const setNames = (type,other) => {
  const name1 = prompt("Player 1 name").toUpperCase()
  const name2 = prompt("Player 2 name").toUpperCase()
  const p = document.querySelector(".name-1")
  const p2 = document.querySelector(".name-2")
  p.textContent = `${name1} is ${type}  `
  p2.textContent = ` ${name2} is ${other}`
 
 return{}
}

//displaye winenrs or tie

const result = function() {
  const winner = (type) => {
    const p = document.querySelector(".anounce")
   p.textContent = `${type} is the winner`
  }
  const tie = () => {
    const p = document.querySelector(".anounce")
   p.textContent = "Game was Tied"
  }
  const clean = () => {
    const p = document.querySelector(".anounce")
    p.textContent = ""
  }
   return {winner,tie,clean}
}



