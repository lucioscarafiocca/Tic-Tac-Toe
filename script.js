function createUser (name) {
    const discordName = "@" + name;
  
    let reputation = 0;
    const getReputation = () => reputation;
    const giveReputation = () => reputation++;
  
    return { name, discordName, getReputation, giveReputation };
  }
  
  const josh = createUser("josh");
  josh.giveReputation();
  josh.giveReputation();
  
  console.log({
    discordName: josh.discordName,
    reputation: josh.getReputation()
  });
  // logs { discordName: "@josh", reputation: 2 }



////////////////////////////////////////////////////////////////////////////////////////



//////////checks and changes game turn
const turn = function turn () {
  let turn = ""
  const getTurn = () => turn
  const setTurn = function(decision) {
    if (turn == "cirlce") {
      turn = "exe"
    } else if (turn == "exe") {
      turn = "circle"
    } else {
      turn = `${decision}`
    }
  } 
  return { getTurn, setTurn}
} ()







const players = {} ;

const flowOfGame = {}

const array = []

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
    return [one,two,three,four,five,six,seven,eight,nine]
}  ()


const gameboard = { array : assignDOM}


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
  const first= document.createElement("div")
  first.addEventListener("click", () => {
    if (turn.getTurn() = "exe") {
      first.textContent = "X"
      turn.setTurn()
      moves.addMoveExe()
    } else {
      first.textContent = "O"
      turn.setTurn()
      moves.addMoveCircle()
    }
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
  const first_vertical = [elements[0],elements[0],elements[0]]
  const second_vertical = [elements[1],elements[1],elements[1]]
  const third_vertical =  [elements[2],elements[2],elements[2]]
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
  return {straight,diagonal}
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
    if (array.find(checkWin) != undefined) {
      return "Victory"
    } else { return "Defeat"}
  }
  return result1()
  
} 
}

///////////checks for minimum requeirements for a win 
const moves = function() {
  const moves_played_circle = ""
  const moves_played_exe = ""
  const addMoveCircle = () => moves_played_circle++
  const addMoveExe = () =>  moves_played_exe++
  const circle = checkWins(moves_played_circle,"O") 
  const exe = checkWins(moves_played_exe,"X") 
  const verdict = () => {
    if(circle == "" || exe == "") {
      return "win"
    } else { return "asjdasdasd"}
}

  return {addMoveCircle, addMoveExe,verdict}
}() 

  
console.log(checkWins(3,"X")) 

