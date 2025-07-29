let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let editIndex = null;

// Hardcoded motivational quotes
const hardcodedQuotes = [
  { q: "Believe you can and you're halfway there.", a: "Theodore Roosevelt" },
  { q: "Your time is limited, so don’t waste it living someone else’s life.", a: "Steve Jobs" },
  { q: "Keep going. Everything you need will come to you.", a: "Unknown" },
  { q: "The best way out is always through.", a: "Robert Frost" },
  { q: "Push yourself, because no one else is going to do it for you.", a: "Unknown" },
  { q: "Dream it. Wish it. Do it.", a: "Unknown" },
  { q: "Don't watch the clock; do what it does. Keep going.", a: "Sam Levenson" }
];

// Load a random quote
function loadQuote() {
  const quoteText = document.getElementById('quote');
  const randomIndex = Math.floor(Math.random() * hardcodedQuotes.length);
  const quote = hardcodedQuotes[randomIndex];
  quoteText.textContent = `"${quote.q}" — ${quote.a}`;
}

// Save tasks to localStorage
function saveTasksToStorage(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Get tasks from localStorage
function getTasksFromStorage() {
  return JSON.parse(localStorage.getItem('tasks')) || [];
}

// Render all tasks
function renderTasks() {
  taskList.innerHTML = '';
  const tasks = getTasksFromStorage();
  tasks.forEach((task, index) => {
    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item');

    taskItem.innerHTML = `
      <p>
        <strong>${task.title}</strong><br/>
        <em>${task.description}</em><br/>
        📅 ${task.date} 🕒 ${task.time}
      </p>
      <div class="task-actions">
        <button class="edit-btn">✏️</button>
        <button class="delete-btn">🗑️</button>
      </div>
    `;

    // Edit button
    taskItem.querySelector('.edit-btn').addEventListener('click', () => editTask(index));
    // Delete button
    taskItem.querySelector('.delete-btn').addEventListener('click', () => {
      const updatedTasks = getTasksFromStorage();
      updatedTasks.splice(index, 1);
      saveTasksToStorage(updatedTasks);
      renderTasks();
    });

    taskList.appendChild(taskItem);
  });
}

// Edit task
function editTask(index) {
  const task = getTasksFromStorage()[index];

  document.getElementById('task-title').value = task.title;
  document.getElementById('task-desc').value = task.description;
  document.getElementById('task-date').value = task.date;
  document.getElementById('task-time').value = task.time;

  editIndex = index;
  addTaskBtn.textContent = 'Update Task';
}

// Add or update task
function addTask(e) {
  e.preventDefault();

  const title = document.getElementById('task-title').value.trim();
  const description = document.getElementById('task-desc').value.trim();
  const date = document.getElementById('task-date').value;
  const time = document.getElementById('task-time').value;

  if (!title) return;

  let tasks = getTasksFromStorage();

  if (editIndex !== null) {
    tasks[editIndex] = { title, description, date, time };
    editIndex = null;
    addTaskBtn.textContent = 'Add Task';
  } else {
    tasks.push({ title, description, date, time });
  }

  saveTasksToStorage(tasks);
  renderTasks();
  document.getElementById('task-form').reset();
}

// DOM elements
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

addTaskBtn.addEventListener('click', addTask);

// On load
window.addEventListener('DOMContentLoaded', () => {
  loadQuote();
  renderTasks();
});
