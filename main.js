let initialArray = [1,2,3,4,5,6,7,8,3,2,1,4,5,6,8,7];
let selectedPoints = [];
let selectedPointsLength;
let correctSelections = [];
let sortedArray;
let movesCounter = 0;
let ratings = 3;
let list = document.querySelector(".list");
let displayMoves = document.querySelector("#moves");
let elem = document.getElementsByClassName('star-container');
let timeTaken = document.querySelector('.time_taken');
let displayStar = document.querySelector('.display_star');
let displayNumberOfMoves = document.querySelector('.number_of_moves');
let playAgain = document.querySelector('#playAgain');
displayStar.innerHTML = ratings;

//Timer Variables 
let h1 = document.getElementsByTagName('h1')[0];
let restart = document.getElementById('restart');
let stop = document.getElementById('stop');
let clear = document.getElementById('clear');
let seconds = 0;
let minutes = 0;
let hours = 0;
let t;


function add() {
    seconds++;
    if (seconds >= 60) {
      seconds = 0;
      minutes++;
      if (minutes >= 60) {
        minutes = 0;
        hours++;
      }
    }
  
    h1.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
    timeTaken.innerHTML = h1.textContent;
    timer();
}

function timer() {
    t = setTimeout(add, 1000);
}

 timer();
console.log(elem);


//Shuffle Array so numbers appear in different position everytime browser is refreshed
function shuffle(initialArray) {
    let index;
    let temp;
    let container = initialArray.length;
    
    while (container > 0) {
        
        //select a random index
        index = Math.floor(Math.random()*container);
        container--;

        //always swap content of selected index with last value
        temp = initialArray[container];
        initialArray[container] = initialArray[index];
        initialArray[index] = temp; 
    }

    return initialArray;
}





//shuffle array and store in another variable
sortedArray = shuffle(initialArray);
insertValues();
displayMoves.innerHTML = 0;


//insert the values into the list 
function insertValues() {
    for (let index = 0; index < sortedArray.length; index++) {

        let listItem = document.querySelector(`.list_item:nth-child(${index+1}) span`);
        listItem.style.opacity=0;
        let listValue = sortedArray[index];
        listItem.textContent = listValue;
    }        
}

function starRating(){
    

    if (!(ratings === 1)) {
        --ratings;
        elem[0].children[ratings].classList.remove("checked");
        elem[1].children[ratings].classList.remove("checked");
        return ratings;
    }
    
}

function hasGameEnded(){
    let correctSelectionsLength = correctSelections.length;
    if (correctSelectionsLength===16) {
        clearInterval(t);
        toggleModal();
    }
    
}

/* Restart button */
restart.addEventListener("click",resetPage);
function resetPage() {
    sortedArray = shuffle(initialArray);
    console.log(sortedArray);
    insertValues();
    movesCounter = 0;
    selectedPoints.length = 0;
    correctSelections.length = 0;
    displayMoves.innerHTML = 0;
    h1.textContent = "00:00:00";
    seconds = 0; minutes = 0; hours = 0;
    ratings = 3;
    for (let index = 0; index < ratings; index++) {
        elem[0].children[index].classList.add("checked");        
    }    
}

playAgain.addEventListener("click",restartGame);
function restartGame() {
    resetPage();
    toggleModal();
}

list.addEventListener("click",function(event){
    
    //get value of position that was clicked 
    let position = event.target;
    console.log(position);
    
        //check if the position has been selected already (if its visible to the user currently)
        if(!(correctSelections.includes(position)) && !(selectedPoints.includes(position))){
            
            //if the position is not either in selected array or correct array, do this.
            position.style.opacity = 1;  
            console.log("here");
            selectedPoints.push(position);
            console.log(selectedPoints);
            selectedPointsLength = selectedPoints.length
            //set position back to null so we can get the position of second li that was clicked
            position = ""; 

            //if we have gotten both positions, do this
            if (selectedPointsLength == 2) {
                //increase moves only when two positions have been selected(ie selectionOfTwoPoints==oneMove)
                movesCounter++;
                displayMoves.innerHTML = movesCounter;
                displayNumberOfMoves.innerHTML = movesCounter;
                console.log("movescounter"+ movesCounter);
                if (selectedPoints[0].textContent === selectedPoints[1].textContent) {
                    console.log ("Same");
                    correctSelections.push(selectedPoints[0], selectedPoints[1])
                    console.log(correctSelections);

                    //check if game has ended
                    hasGameEnded();

                    //selected points array is for comparison so we empty it back after comparing 
                    selectedPoints.length = 0;
                }else {
                    //this happens if the selected points arent the same

                    //check if the move has been made at least three times from the last time before reducing rating
                    if (movesCounter%3 === 0) {
                        displayStar.innerHTML = starRating();
                    }
                    for (let index = 0; index <=1 ; index++) {
                        selectedPoints[index].style.opacity = 0;                
                    }
                    //selected points array is for comparison so we empty it back after comparing 
                    selectedPoints.length = 0;
                }
                console.log(selectedPoints);    
            }  
        }
});


//modal
var modal = document.querySelector(".modal");
var closeButton = document.querySelector(".close-button");


function toggleModal() {
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}


closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);



console.log(sortedArray);