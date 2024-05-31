const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const todoLane = document.getElementById("todo-lane");

// Load tasks from localStorage when the page loads
document.addEventListener("DOMContentLoaded", () => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        addTaskToDOM(task);
    });
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = input.value;

    if(!value) return; // if no value, do nothing

    addTaskToDOM(value);
    saveTaskToLocalStorage(value);

    input.value = "";
});

function addTaskToDOM(taskValue) {
    const newTask = document.createElement("p");
    newTask.classList.add("task");
    newTask.setAttribute("draggable", "true");
    newTask.innerText = taskValue;

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "x";
    deleteButton.classList.add("delete-button");
    deleteButton.addEventListener("click", () => {
        removeTaskFromDOM(newTask, taskValue);
        removeTaskFromLocalStorage(taskValue);
    });

    newTask.appendChild(deleteButton);

    newTask.addEventListener("dragstart", () => {
        newTask.classList.add("is-dragging");
    });
    newTask.addEventListener("dragend", () => {
        newTask.classList.remove("is-dragging");
    });

    todoLane.appendChild(newTask);
}

function saveTaskToLocalStorage(task) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTaskFromLocalStorage(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTaskFromDOM(taskElement) {
    taskElement.remove();
}




