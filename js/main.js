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
let startGame = document.querySelector('#startGame');
let itemCover = document.getElementsByTagName("li");

//Timer Variables 
let h1 = document.getElementsByTagName('h1')[0];
let restart = document.getElementById('restart');
let stop = document.getElementById('stop');
let clear = document.getElementById('clear');
let seconds = 0;
let minutes = 0;
let hours = 0;
let t;

//modal
let modal = document.querySelector(".modal");
let startModal = document.querySelector (".start-modal");


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

//insert the values into the list 
function insertValues() {
    for (let index = 0; index < sortedArray.length; index++) {

        let listItem = document.querySelector(`.list_item:nth-child(${index+1}) span`);
        listItem.style.opacity=0;
        let listValue = sortedArray[index];
        listItem.textContent = listValue;
    }        
}

//Star rating manipulation
function starRating(){

    if (!(ratings === 1)) {
        --ratings;
        elem[0].children[ratings].classList.remove("checked");
        elem[1].children[ratings].classList.remove("checked");
        //store value of star rating for display
        displayStar.innerHTML = ratings;
    }else if(ratings === 1){
        displayStar.innerHTML = 1;
    }
    
}

//Check if game has ended
function hasGameEnded(){
    let correctSelectionsLength = correctSelections.length;
    if (correctSelectionsLength===16) {
        clearInterval(t);
        toggleModal();
    }
    
}

//reset page to default
function resetPage() {
    sortedArray = shuffle(initialArray);
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
    for (let index = 0; index < itemCover.length; index++) {
        itemCover[index].classList.add("star"); 
    }    
}

//Play Again
function restartGame() {
    resetPage();
    timer();
    toggleModal();
}

//flip card back if they are not the same
function disappear(){
    for (let index = 0; index <=1 ; index++) {
        selectedPoints[index].style.opacity = 0;  
        selectedPoints[index].parentNode.classList.add("star");                 
    }
    //selected points array is for comparison so we empty it back after comparing 
    selectedPoints.length = 0;   
}

function toggleModal() {
    modal.classList.toggle("show-modal");
}

function toggleStartModal() {
    startModal.classList.toggle("show-modal");
    if (startModal.classList.contains("show-modal") === false) {
        timer();
    }
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}


//Increment time
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

//call function to increment time every second
function timer() {
        t = setTimeout(add, 1000);  
}



//background animation
celebrate(1);

//store shuffled array in another variable
sortedArray = shuffle(initialArray);
console.log(sortedArray);

//insert values of sorted array in each list item
insertValues();

//first modal displayed to user
toggleStartModal();

//store value of star rating for display
displayStar.innerHTML = ratings;

// Reset button 
restart.addEventListener("click",resetPage);

//Play Again button
playAgain.addEventListener("click",restartGame);

startGame.addEventListener("click",toggleStartModal);

window.addEventListener("click", windowOnClick);

list.addEventListener("click",function(event){
    
    //get value of position that was clicked 
    let position = event.target;
    
    //get the tag name and make sure it is a span
    let targetElement = event.target.tagName;   
    if (targetElement === 'SPAN') {    
        //check if the position has been selected already (if its visible to the user currently)
        if(!(correctSelections.includes(position)) && !(selectedPoints.includes(position))){
            //If it hasn't been selected, do:
            
            //stop background animation
            celebrate(0);

            //remove the default background image
            position.parentNode.classList.remove ("star");
            
            //display the number
            position.style.opacity = 1; 
            
            //save the selected point in an array ie the span selected
            selectedPoints.push(position);
            
            //get the current length of selected point array
            selectedPointsLength = selectedPoints.length

            //set position back to null so we can get the position of second span that will be clicked and stored
            position = ""; 

            //if we have stored two positions in selected points array, do this:
            if (selectedPointsLength == 2) {
                //increase moves by 1 ie two selections = 1 move
                movesCounter++;

                //increase move on user screen for:
                //main screen
                displayMoves.innerHTML = movesCounter;
                //modal
                displayNumberOfMoves.innerHTML = movesCounter;
                
                //check text content of both spans 
                if (selectedPoints[0].textContent === selectedPoints[1].textContent) {
                   //if the text content of both spans are the same, do this:

                   //store both spans in correct selection array
                    correctSelections.push(selectedPoints[0], selectedPoints[1])
                    
                    //animate background
                    celebrate(1);

                    //check if game has ended
                    hasGameEnded();
                    
                    /*if game hasnt ended, empty selected points array so we can compare two new values that 
                    would be selected*/ 
                    selectedPoints.length = 0;   
                    
                }else {
                    //if the text content of both spans are not the same, do this:

                    //check if the move has been made at least three times since last time checked before reducing rating
                    if (movesCounter%3 === 0) {
                        starRating();
                    }
                    
                    //call function to flip card back. i.e make background image appear back
                    setTimeout("disappear()",1000);
                   
                } 
            }  
        }
    }
});







