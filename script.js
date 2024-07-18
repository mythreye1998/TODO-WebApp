let todo = JSON.parse(globalThis.window.localStorage.getItem("todo")) || [];
let todoInput = document.getElementById("todoInput");
console.log(todoInput);
var todoCount = document.getElementById("todoCount");
let todoList = document.getElementById("todoList");
console.log("I m here");
let addButton = document.querySelector(".btn");
let deleteButton = document.getElementById("deleteButton");

document.addEventListener("DOMContentLoaded", function () {
  addButton.addEventListener("click", addTask);
  todoInput.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
      event.preventDefault();
      addTask();
    }
  });
  deleteButton.addEventListener("click", deleteAllTasks);
  displayTasks();
});

const addTask = () => {
  let newTask = todoInput.value.trim();
  if (newTask.length > 0) {
    todo.push({
      text: newTask,
      disabled: false,
    });
  }
  saveToLocalStorage();
  todoInput.value = "";
  displayTasks();
};
const saveToLocalStorage = () => {
  localStorage.setItem("todo", JSON.stringify(todo));
};

const deleteAllTasks = () => {
  todo = [];
  saveToLocalStorage();
  displayTasks();
};

const toggleTask = (idx) => {
  todo[idx].disabled = !todo[idx].disabled;
  saveToLocalStorage();
  displayTasks();
};

function displayTasks() {
  todoList.innerHTML = "";
  // run a for loop each todo arr idx and display each index
  todo.forEach((item, idx) => {
    const p = document.createElement("p");
    p.innerHTML = `
    <div class="todo-container">
    <input type="checkbox" 
    class = "todo-checkbox"/
    id= "input-${idx}" ${item.disabled ? "checked" : ""}
    />
    <p id="todo-${idx}" class="${
      item.disabled ? "disabled" : ""
    }" onclick = "editTask(${idx})">
    ${item.text}
    </p>
    </div>
    `;
    p.querySelector(".todo-checkbox").addEventListener("change", () =>
      toggleTask(idx)
    );
    todoList.appendChild(p);
  });
  todoCount.textContent = todo.length;
}

function editTask(idx) {
  const currEle = document.getElementById(`todo-${idx}`);
  const currText = todo[idx].text;
  const inputEl = document.createElement("input");
  inputEl.value = currText;
  currEle.replaceWith(inputEl);
  inputEl.focus();
  inputEl.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
      const updatedText = inputEl.value.trim();
      if (updatedText) {
        todo[idx].text = updatedText;
        saveToLocalStorage();
      }
      displayTasks();
    }
  });
}