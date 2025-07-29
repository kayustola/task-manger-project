let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
// Get elements
const taskInput = document.getElementById('task-input');
const categorySelect = document.getElementById('category-select');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const taskTime = document.getElementById('task-time');

// Event listener
addTaskBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  const category = categorySelect.value;
  const time = taskTime.value || 'No time set';

  if (taskText === '') {
    alert('Please enter a task.');
    return;
  }

  const task = {
    id: Date.now(),
    text: taskText,
    category,
    time
  };

  tasks.push(task);
  saveTasks();
  renderTask(task);

  taskInput.value = '';
  taskTime.value = '';
  categorySelect.value = 'general';
});
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
  `;

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
