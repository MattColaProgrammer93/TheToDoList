// @ts-ignore: Ignoring issue with js-datepicker lack of intellisense
const picker = datepicker("#due-date");
picker.setMin(new Date()); // Set to today's date

class ToDoItem{
    assignmentTitle:string;
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
}

function main(){
    if(isValid()){
        let item = getToDoItem();
        displayToDoItem(item);
    }
}

/*
    Check form data is valid
*/
function isValid():boolean{
    return true;
}

/**
 * Get all of the input off form and wrap
 * in a ToDoItem object
 */
function getToDoItem():ToDoItem{
    let myItem = new ToDoItem;
    // get assignmentTitle
    let titleInput = getInputById("assignment-title");
    myItem.assignmentTitle = titleInput.value;

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
    itemText.innerText = item.assignmentTitle;

    // ex. <p>May 4th 2022</p>
    let itemDate = document.createElement("p");
    itemDate.innerText = item.dueDate.toDateString();

    // ex. <div class="todo finished"></div> or <div class="todo"></div>
    let itemDiv = document.createElement("div");
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

// Shortcut for getElementById
function getById(id:string){
    return document.getElementById(id);
}

// Shortcut for getById
function getInputById(id:string):HTMLInputElement{
    return <HTMLInputElement>document.getElementById(id);
}