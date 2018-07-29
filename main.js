let initialArray = [1,2,3,4,5,6,7,8,3,2,1,4,5,6,8,7];
let selectedPoints = [];
let selectedPointsLength;
let correctSelections = [];
let sortedArray;
let list = document.querySelector(".list");



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



//insert the values into the list 
for (let index = 0; index < sortedArray.length; index++) {

    let listItem = document.querySelector(`.list_item:nth-child(${index+1}) span`);
    let listValue = sortedArray[index];
    listItem.textContent = listValue;
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
            if (selectedPoints[0].firstChild.textContent === selectedPoints[1].firstChild.textContent) {
                console.log ("Same");
                correctSelections.push(selectedPoints[0], selectedPoints[1])
                console.log(correctSelections);

                //selected points array is for comparison so we empty it back after comparing 
                selectedPoints.length = 0;
            }else {
                //this happens if the selected points arent the same
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