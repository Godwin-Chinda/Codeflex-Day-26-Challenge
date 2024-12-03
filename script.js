document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  const addTaskBtn = document.getElementById("addBtn");
  const taskList = document.getElementById("taskList");

  loadTasks();

  // Add-task button click even
  addTaskBtn.addEventListener("click", () => {
    const taskValue = taskInput.value.trim();
    if (taskValue) {
      addTask(taskValue);
      taskInput.value = "";
    } else {
      alert("Please enter a task!");
    }
  });

  // Add task function
  function addTask(task) {
    const tasks = getTasksFromLocalStorage();

    const li = document.createElement("li");
    li.textContent = task;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
      taskList.removeChild(li);
      removeTaskFromLocalStorage(task);
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    tasks.push(task);
    saveTasksToLocalStorage(tasks);
  }

  // load tasks from localStorage function
  function loadTasks() {
    const tasks = getTasksFromLocalStorage();
    tasks.forEach((task) => {
      const li = document.createElement("li");
      li.textContent = task;

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.addEventListener("click", () => {
        taskList.removeChild(li);
        removeTaskFromLocalStorage(task);
      });

      li.appendChild(deleteBtn);
      taskList.appendChild(li);
    });
  }

  //get tasks from localStorage
  function getTasksFromLocalStorage() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  }

  // save tasks to localStorage
  function saveTasksToLocalStorage(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  //Remove a task from localStorage
  function removeTaskFromLocalStorage(taskToRemove) {
    const tasks = getTasksFromLocalStorage();
    const filteredTasks = tasks.filter((task) => task !== taskToRemove);
    saveTasksToLocalStorage(filteredTasks);
  }
});
