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
function loadQuote() {
  const quoteText = document.getElementById('quote');

  fetch('https://api.quotable.io/random')
    .then(res => res.json())
    .then(data => {
      quoteText.textContent = `"${data.content}" — ${data.author}`;
    })
    .catch(err => {
      quoteText.textContent = `"Keep going. Your future self will thank you." — Unknown`;
      console.error('Quote fetch error:', err);
    });
}

// Load quote on page load
window.addEventListener('DOMContentLoaded', loadQuote);

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
