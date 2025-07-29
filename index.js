let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let editIndex = null;
// Get elements
const taskInput = document.getElementById('task-input');
const categorySelect = document.getElementById('category-select');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const taskTime = document.getElementById('task-time');

function addTask(e) {
  e.preventDefault();

  const title = document.getElementById('task-title').value.trim();
  const description = document.getElementById('task-desc').value.trim();
  const date = document.getElementById('task-date').value;
  const time = document.getElementById('task-time').value;

  if (!title) return;

  let tasks = getTasksFromStorage();

  if (editIndex !== null) {
    // We are editing an existing task
    tasks[editIndex] = { title, description, date, time };
    editIndex = null;
    document.getElementById('add-task-btn').textContent = 'Add Task';
  } else {
    // We are adding a new task
    tasks.push({ title, description, date, time });
  }

  saveTasksToStorage(tasks);
  renderTasks();
  document.getElementById('task-form').reset();
}
// Fetch and display a motivational quote
const hardcodedQuotes = [
  { q: "Believe you can and you're halfway there.", a: "Theodore Roosevelt" },
  { q: "Your time is limited, so don’t waste it living someone else’s life.", a: "Steve Jobs" },
  { q: "Keep going. Everything you need will come to you.", a: "Unknown" },
  { q: "The best way out is always through.", a: "Robert Frost" },
  { q: "Push yourself, because no one else is going to do it for you.", a: "Unknown" },
  { q: "Dream it. Wish it. Do it.", a: "Unknown" },
  { q: "Don't watch the clock; do what it does. Keep going.", a: "Sam Levenson" }
];

function loadQuote() {
  const quoteText = document.getElementById('quote');
  const randomIndex = Math.floor(Math.random() * hardcodedQuotes.length);
  const quote = hardcodedQuotes[randomIndex];
  quoteText.textContent = `"${quote.q}" — ${quote.a}`;
}


function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTask(task) {
  const taskItem = document.createElement('div');
  taskItem.classList.add('task-item');
  taskItem.setAttribute('data-id', task.id);

  taskItem.innerHTML = `
    <p>
      <strong>${task.text}</strong>
      <span>(${task.category})</span> <br/>
      <small>🕒 ${task.time}</small>
    </p>
    <button class="delete-btn">🗑️</button>
    editBtn.innerHTML = '✏️'; // Add this after your deleteBtn
editBtn.classList.add('edit-btn');
editBtn.addEventListener('click', () => editTask(index));
taskActions.appendChild(editBtn);
  `;
function editTask(index) {
  const tasks = getTasksFromStorage();
  const task = tasks[index];

  document.getElementById('task-title').value = task.title;
  document.getElementById('task-desc').value = task.description;
  document.getElementById('task-date').value = task.date;
  document.getElementById('task-time').value = task.time;

  editIndex = index;
  document.getElementById('add-task-btn').textContent = 'Update Task';
}
  const deleteBtn = taskItem.querySelector('.delete-btn');
  deleteBtn.addEventListener('click', () => {
    taskList.removeChild(taskItem);
    tasks = tasks.filter(t => t.id !== task.id);
    saveTasks();
  });

  taskList.appendChild(taskItem);
}
window.addEventListener('DOMContentLoaded', () => {
  loadQuote(); // already exists
  tasks.forEach(task => renderTask(task));
});

let editIndex = null; // This keeps track of which task you're editing

function editTask(index) {
  const tasks = getTasksFromStorage(); // Get current task list
  const task = tasks[index]; // Get the task at that position

  // Fill the form with the task details
  document.getElementById('task-title').value = task.title;
  document.getElementById('task-desc').value = task.description;
  document.getElementById('task-date').value = task.date;
  document.getElementById('task-time').value = task.time;

  // Remember which task you're editing
  editIndex = index;

  // Change the button text to 'Update Task'
  document.getElementById('add-task-btn').textContent = 'Update Task';
}
