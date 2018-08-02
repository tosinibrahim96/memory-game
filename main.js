let initialArray = [1,2,3,4,5,6,7,8,3,2,1,4,5,6,8,7];
let selectedPoints = [];
let selectedPointsLength;
let correctSelections = [];
let sortedArray;
let movesCounter = 0;
let ratings = 3;
let list = document.querySelector(".list");
let displayMoves = document.querySelector("#moves");

//Timer Variables 
let h1 = document.getElementsByTagName('h1')[0];
let start = document.getElementById('start');
let stop = document.getElementById('stop');
let clear = document.getElementById('clear');
let seconds = 0;
let minutes = 0;
let hours = 0;
let t;


function myFunction() {
    let l = document.querySelector(".selected:last-of-type");
    console.log(l);
}

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
  
    timer();
}

function timer() {
    t = setTimeout(add, 1000);
}

 timer();

/* Start button */
start.addEventListener("click",timer);



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
displayMoves.innerHTML = 0;


//insert the values into the list 
for (let index = 0; index < sortedArray.length; index++) {

    let listItem = document.querySelector(`.list_item:nth-child(${index+1}) span`);
    let listValue = sortedArray[index];
    listItem.textContent = listValue;
}

function starRating(){
    var elem = document.querySelector('.star-container');

    if (!(ratings === 1)) {
        --ratings;
        elem.children[ratings].classList.remove("checked");
        console.log();
        return ratings;
    }
    
}

function hasGameEnded(){
    let correctSelectionsLength = correctSelections.length;
    if (correctSelectionsLength===16) {
        clearInterval(t);
    }
}



list.addEventListener("click",function(event){
    
    //get value of position that was clicked i.e(the clicked li in this case)
    let position = event.target;

    
    if(!(correctSelections.includes(position))){
            
        //change display of the span(firstChild) to block display
        position.firstChild.style.display = "block";

        selectedPoints.push(position);
        selectedPointsLength = selectedPoints.length
        //set position back to null so we can get the position of second li that was clicked
        position = ""; 

        //if we have gotten both positions, do this
        if (selectedPointsLength == 2) {
            //increase moves only when two positions have been selected(ie selectionOfTwoPoints==oneMove)
            movesCounter++;
            displayMoves.innerHTML = movesCounter;
            console.log("movescounter"+ movesCounter);
            if (selectedPoints[0].firstChild.textContent === selectedPoints[1].firstChild.textContent) {
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
                    starRating();
                }
                for (let index = 0; index <=1 ; index++) {
                    selectedPoints[index].firstChild.style.display = "none";                
                }
                //selected points array is for comparison so we empty it back after comparing 
                selectedPoints.length = 0;
            }
            console.log(selectedPoints);    
        }  
    }
});







console.log(sortedArray);