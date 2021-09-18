let toDoList = JSON.parse(localStorage.getItem("tasks")) || [];

const list = document.querySelector("#task-list");
const addTask = document.querySelector("#add-task");
const addTaskText = document.querySelector("#add-task-text");

const liElement = (task) =>
  `<li class="task ${task.done ? "done" : ""}" id="task_${task.id}">
    <input type="checkbox" id="check_${task.id}" ${task.done ? "checked" : ""}>
    <span>${task.description}</span>
    <button id="delete_${task.id}">x</button>
  </li>`;

const updateTask = (task) => {
  toDoList = toDoList.map((item) =>
    item.id == task.id ? { ...item, done: !item.done } : item
  );
  toDoList.forEach((task) => {
    const t = document.querySelector(`#task_${task.id}`);
    const checkbox = document.querySelector(`#check_${task.id}`);
    task.done ? t.classList.add("done") : t.classList.remove("done");
    checkbox.checked = task.done;
  });
  updateList()
};

const updateList = () => {
  list.innerHTML = "";
  toDoList.forEach((task) => {
    list.innerHTML += liElement(task);
  });
  toDoList.forEach((task) => {
    document
      .querySelector(`#check_${task.id}`)
      .addEventListener("click", () => updateTask(task));
  });

  toDoList.forEach((task) => {
    document
      .querySelector(`#delete_${task.id}`)
      .addEventListener("click", () => deleteTask(task));
  });
  updateStorage();
};

const deleteTask = (task) => {
  const index = toDoList.findIndex((item) => item.id == task.id);
  toDoList.splice(index, 1);
  updateList();
};

const createTask = (description) => {
  toDoList.push({ id: toDoList.length, description, done: false });
  updateList();
};

const updateStorage = () => {
  localStorage.setItem("tasks", JSON.stringify(toDoList));
};

addTask.addEventListener("submit", (event) => {
  event.preventDefault();
  createTask(addTaskText.value);
  addTaskText.value = "";
  updateList();
});

updateList();
