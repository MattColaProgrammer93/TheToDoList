// @ts-ignore: Ignoring issue with js-datepicker lack of intellisense
const picker = datepicker("#due-date");
picker.setMin(new Date()); // Set to today's date

class ToDoItem{
    title:string;
    dueDate:Date;
    isFinished:boolean;
}

/*
let item = new ToDoItem();
item.assignmentTitle = "Test";
item.dueDate = new Date(2020, 6, 1);
item.isFinished = false;
*/

window.onload = function(){
    let addItem = getById("add");
    addItem.onclick = main;

    // Load saved item
    loadSavedItems();
}

/**
 * Loads the item from storage
 */
function loadSavedItems(){
    let itemArray = getToDoItems(); // read from storage
    
    for(let i = 0; i < itemArray.length; i++){
        let currItem = itemArray[i];
        displayToDoItem(currItem);
    }
}

function main(){
    // Will reset any error messages present
    resetErrorMessages();

    if(isValid()){
        let item = getToDoItem();
        displayToDoItem(item);
        saveToDoItems(item);
    }
}

/*
    Check form data is valid
*/
function isValid():boolean{
    let isValid = true;

    let title = getInputById("assignment-title").value;
    if (title == "" || title == null){
        isValid = false;
        displayError("Title is required");
    }

    let date = getInputById("due-date").value;
    if (date == null){
        isValid = false;
        displayError("Date is required");
    }

    return isValid;
}

/**
 * Will add error messages to the webpage
 */

 function displayError(errMsg:string) {
    let errSummary = getById("validation-summary");
    let errItem = document.createElement("li");
    errItem.innerText = errMsg;

    errSummary.appendChild(errItem);
}

/**
 * Will reset any error messages that is on the web page
 */
 function resetErrorMessages():void{
    let errSummary = getById("validation-summary");
    errSummary.innerText = "";
}

/**
 * Get all of the input off form and wrap
 * in a ToDoItem object
 */
function getToDoItem():ToDoItem{
    let myItem = new ToDoItem;
    // get assignmentTitle
    let titleInput = getInputById("assignment-title");
    myItem.title = titleInput.value;

    // get dueDate
    let dueDateInput = getInputById("due-date");
    myItem.dueDate = new Date(dueDateInput.value);

    // get isFinished
    let isFinished = getInputById("is-finished");
    myItem.isFinished = isFinished.checked;

    return myItem;
}

/**
 * Displays given ToDoItem on the web page
 */
function displayToDoItem(item:ToDoItem):void{
    // ex. <h3>Rectangles and Circles</h3>
    let itemText = document.createElement("h3");
    itemText.innerText = item.title;

    // ex. <p>May 4th 2022</p>
    let itemDate = document.createElement("p");
    // itemDate.innerText = item.dueDate.toDateString();
    let dueDate = new Date(item.dueDate.toString());
    itemDate.innerText = dueDate.toDateString();

    // ex. <div class="todo finished"></div> or <div class="todo"></div>
    let itemDiv = document.createElement("div");

    itemDiv.onclick = markAsFinished;

    itemDiv.classList.add("todo");
    if (item.isFinished){
        itemDiv.classList.add("finished");
    }

    /*
        <div class="finished">
            <h3>Rectangles and Circles</h3>
            <p>May 4th 2022</p>
        </div>
    */
    itemDiv.appendChild(itemText);
    itemDiv.appendChild(itemDate);

    if (item.isFinished){
        let isAssignmentFinished = getById("complete-items");
        isAssignmentFinished.appendChild(itemDiv);
    } else {
        let isAssignmentNotFinished = getById("incomplete-items");
        isAssignmentNotFinished.appendChild(itemDiv);
    }
}

function markAsFinished(){
    let itemDiv = <HTMLElement>this;
    console.log(itemDiv);
    itemDiv.classList.add("finished");

    let finishedItems = getById("complete-items");
    console.log(finishedItems);
    finishedItems.appendChild(itemDiv);
}
/**
 * Will save ToDo items into storage
 */
function saveToDoItems(item:ToDoItem):void{
    let currItems = getToDoItems();
    if(currItems == null){ // No items found
        currItems = new Array();
    }
    currItems.push(item); // Add new item to the curr item

    let currItemsStrings = JSON.stringify(currItems);
    localStorage.setItem(todokey, currItemsStrings);
}
/**
 * Get stored ToDo items or 
 * returns null if none are found
 */
function getToDoItems():ToDoItem[]{
    let itemString = localStorage.getItem(todokey);
    let item:ToDoItem[] = JSON.parse(itemString);
    return item;
}

// Acts a key for "todo"
const todokey = "todo";

// Shortcut for getElementById
function getById(id:string){
    return document.getElementById(id);
}

// Shortcut for getById
function getInputById(id:string):HTMLInputElement{
    return <HTMLInputElement>document.getElementById(id);
}