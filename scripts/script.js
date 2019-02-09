let colorArray,
    rgbDisplay,
    notifications,
    colorBoard,
    newColors,
    numOfSquares,
    modeList,
    pickedColor;

numOfSquares = 6;
colorArray = [];
colorBoard = document.querySelectorAll(".square");
rgbDisplay = document.querySelector("#rgbDisplay");
newColors = document.querySelector("#newColors");
notifications = document.querySelector("#notifications");
h1 = document.querySelector("h1");
modeList = document.querySelectorAll(".mode");

init();

//initialize the game
function init() {
    setUpModeBtns();
    setUpBoard();
    reset();
}

//add event listeners to mode btns
function setUpModeBtns(){
    for(let index = 0; index < modeList.length; index++){
        modeList[index].addEventListener("click", function () {
            modeList[0].classList.remove("selected");
            modeList[1].classList.remove("selected");
            this.classList.add("selected");
            numOfSquares = (this.textContent === "EASY") ? 3 : 6;
            reset();
        });
    }
}


//add colors to the board
function setUpBoard(){
    for(let index = 0; index < colorBoard.length; index++){
        colorBoard[index].setAttribute("style", `background-color: ${colorArray[index]}`);
        colorBoard[index].addEventListener("click", function () {
            //if player pick the correct color
            if(this.style.backgroundColor === rgbDisplay.textContent){
                //set the h1 background color
                document.querySelector("h1").setAttribute("style", `background-color: ${this.style.backgroundColor}`);
                //display correct in notification
                notifications.textContent = "Correct!!!";
                //set the New Colors Btn to Play Again
                newColors.textContent = "Play Again";
                //change all square colors to correct color
                setWinningColor(this.style.backgroundColor);
            } else {
                this.style.backgroundColor = "#232323";
                notifications.textContent = "Try Again";
            }
        });
    }
}

//change colors on "New Colors" click
newColors.addEventListener("click", function () {    
    reset();
});

//create a random color
function createColor(){
    let red,
        green,
        blue;
    
    red = Math.floor(Math.random()*256);
    green = Math.floor(Math.random()*256);
    blue = Math.floor(Math.random()*256);

    return (`rgb(${red}, ${green}, ${blue})`);
}

//generate a color array
function generateColorArray(numOfSquares){
    colorArray = new Array();

    for(let index = 0; index < numOfSquares; index++){
        colorArray.push(createColor());
    }
}

//pick a color for display
function pickColor(){
    return colorArray[Math.floor(Math.random()*colorArray.length)];
}

//set squares to pick color
function setWinningColor(winningColor){
    for(let index = 0; index < colorArray.length; index++){
        if(colorBoard[index].style.backgroundColor != winningColor){
            colorBoard[index].style.backgroundColor = winningColor;
        }        
    }
}

//reset displays
function reset() {
    generateColorArray(numOfSquares);
    pickedColor = pickColor();
    rgbDisplay.textContent = pickedColor;
    notifications.textContent = "";
    //reset the New Colors Btn text
    newColors.textContent = "NEW COLORS";
    h1.style.backgroundColor = "steelblue";

    for(let index = 0; index < colorBoard.length; index++){
        if(colorArray[index]){
            colorBoard[index].style.display = "block";
            colorBoard[index].style.backgroundColor = colorArray[index];
        } else {
            colorBoard[index].style.display = "none";
        }
    }
}