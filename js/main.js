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
    clearErrors();
    if (isValid()) {
        var item = getToDoItem();
        displayToDoItem(item);
    }
}
function isValid() {
    var isValid = true;
    var title = getInputById("assignment-title").value;
    if (title == "" || title == null) {
        isValid = false;
        displayError("assignment-title", "A title is required");
    }
    var date = getInputById("due-date").value;
    if (date == null) {
        isValid = false;
        displayError("assignment-title", "A title is required");
    }
    return isValid;
}
function displayError(id, errMsg) {
    var errorText = getInputById(id);
    var errSpan = errorText.nextElementSibling;
    errSpan.innerText = errMsg;
}
function clearErrors() {
    var errSummary = getById("validation-summary");
    errSummary.innerText = "";
}
function getToDoItem() {
    var myItem = new ToDoItem;
    var titleInput = getInputById("assignment-title");
    myItem.assignmentTitle = titleInput.value;
    var dueDateInput = getInputById("due-date");
    myItem.dueDate = new Date(dueDateInput.value);
    var isFinished = getInputById("is-finished");
    myItem.isFinished = isFinished.checked;
    return myItem;
}
function displayToDoItem(item) {
    var itemText = document.createElement("h3");
    itemText.innerText = item.assignmentTitle;
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
