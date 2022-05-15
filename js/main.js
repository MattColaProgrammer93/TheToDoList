var picker = datepicker("#due-date");
picker.setMin(new Date());
var ToDoItem = (function () {
    function ToDoItem() {
    }
    return ToDoItem;
}());
window.onload = function () {
    var addItem = getById("add");
    addItem.onclick = main;
};
function main() {
    resetErrorMessages();
    if (isValid()) {
        var item = getToDoItem();
        displayToDoItem(item);
    }
}
function isValid() {
    var isValid = true;
    var title = getInputById("assingment-title").value;
    if (title == "" || title == null) {
        isValid = false;
        displayError("Title is required");
    }
    var date = getInputById("due-date").value;
    if (date == null) {
        isValid = false;
        displayError("Date is required");
    }
    return isValid;
}
function displayError(errMsg) {
    var errSummary = getById("validation-summary");
    var errItem = document.createElement("li");
    errItem.innerText = errMsg;
    errSummary.appendChild(errItem);
}
function resetErrorMessages() {
    var errSummary = getById("validation-summary");
    errSummary.innerText = "";
}
function getToDoItem() {
    var myItem = new ToDoItem;
    var titleInput = getInputById("assingment-title");
    myItem.title = titleInput.value;
    var dueDateInput = getInputById("due-date");
    myItem.dueDate = new Date(dueDateInput.value);
    var isFinished = getInputById("is-finished");
    myItem.isFinished = isFinished.checked;
    return myItem;
}
function displayToDoItem(item) {
    var itemText = document.createElement("h3");
    itemText.innerText = item.title;
    var itemDate = document.createElement("p");
    itemDate.innerText = item.dueDate.toDateString();
    var itemDiv = document.createElement("div");
    itemDiv.onclick = markAsFinished;
    itemDiv.classList.add("todo");
    if (item.isFinished) {
        itemDiv.classList.add("finished");
    }
    itemDiv.appendChild(itemText);
    itemDiv.appendChild(itemDate);
    if (item.isFinished) {
        var isAssignmentFinished = getById("complete-items");
        isAssignmentFinished.appendChild(itemDiv);
    }
    else {
        var isAssignmentNotFinished = getById("incomplete-items");
        isAssignmentNotFinished.appendChild(itemDiv);
    }
}
function markAsFinished() {
    var itemDiv = this;
    console.log(itemDiv);
    itemDiv.classList.add("finished");
    var finishedItems = getById("complete-items");
    console.log(finishedItems);
    finishedItems.appendChild(itemDiv);
}
function getById(id) {
    return document.getElementById(id);
}
function getInputById(id) {
    return document.getElementById(id);
}
