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
    if (isValid()) {
        var item = getToDoItem();
        displayToDoItem(item);
    }
}
function isValid() {
    return true;
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
function getById(id) {
    return document.getElementById(id);
}
function getInputById(id) {
    return document.getElementById(id);
}
