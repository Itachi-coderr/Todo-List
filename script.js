document.addEventListener("DOMContentLoaded", loadTasks);

function loadTasks() {
  const uncompletedTasks = JSON.parse(localStorage.getItem("uncompletedTasks")) || [];
  const completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];

  uncompletedTasks.forEach(task => addTaskToList(task, false));
  completedTasks.forEach(task => addTaskToList(task, true));
}

function saveTasks() {
  const uncompletedTasks = [];
  const completedTasks = [];

  document.querySelectorAll("#uncompleted-tasks li").forEach(li => {
    uncompletedTasks.push({
      title: li.querySelector(".title").innerText,
      description: li.querySelector(".description").innerText,
    });
  });

  document.querySelectorAll("#completed-tasks li").forEach(li => {
    completedTasks.push({
      title: li.querySelector(".title").innerText,
      description: li.querySelector(".description").innerText,
    });
  });

  localStorage.setItem("uncompletedTasks", JSON.stringify(uncompletedTasks));
  localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
}

function addTask() {
  const title = document.getElementById("task-title").value;
  const desc = document.getElementById("task-desc").value;

  if (title && desc) {
    const task = { title, description: desc };
    addTaskToList(task, false);
    saveTasks();
    
    document.getElementById("task-title").value = "";
    document.getElementById("task-desc").value = "";
  } else {
    alert("Please fill the boxes");
  }
}

function addTaskToList(task, isCompleted) {
  const taskList = isCompleted ? document.getElementById("completed-tasks") : document.getElementById("uncompleted-tasks");
  const li = document.createElement("li");
  li.className = "mb-2";
  li.innerHTML = `
    <span class="title font-bold">${task.title}</span>
    <span class="description block">${task.description}</span>
    ${isCompleted ? '' : '<button onclick="completeTask(this)" class="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2">Complete</button>'}
    <button onclick="deleteTask(this)" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">Delete</button>
  `;
  if (isCompleted) {
    li.querySelector(".title").classList.add;
  }
  taskList.appendChild(li);
}

function completeTask(button) {
  const li = button.parentElement;
  const task = {
    title: li.querySelector(".title").innerText,
    description: li.querySelector(".description").innerText,
  };
  li.remove();
  addTaskToList(task, true);
  saveTasks();
}

function deleteTask(button) {
  button.parentElement.remove();
  saveTasks();
}
