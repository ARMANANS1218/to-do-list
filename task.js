let taskFormEl=document.getElementById('task-form')
let taskInputEl=document.getElementById('task-el')

let themeToggleEl = document.getElementById('theme-toggle');

let taskList =localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];

// Check for saved theme preference
let currentTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-bs-theme', currentTheme);
themeToggleEl.checked = currentTheme === 'light';

//=======================================================================

taskFormEl.addEventListener('submit',function(e){
    e.preventDefault();
    let task=taskInputEl.value.trim()

    taskList.unshift(task);

    localStorage.setItem('tasks',JSON.stringify(taskList));

    displayTask();
    taskInputEl.value='';
});


//Display Functionality 
function displayTask(){
    let eachTask='';


    
    taskList.forEach(function(val,i){
        eachTask=eachTask+`<li class="list-group-item list-group-item-secondary mb-2 mt-2">
        <span class="p-2">${val}</span>
        <i class="bi bi-archive-fill float-end" onclick="deleteTask(${i})" ></i>
        <i class="bi bi-pen-fill float-end me-4 " onClick="updateTask(${i})"></i>
    </li>`;
    });
    document.getElementById('task-list').innerHTML=eachTask;
}
displayTask();

//delete Functionality 
function deleteTask(index){
    taskList.splice(index,1);
    localStorage.setItem('tasks',JSON.stringify(taskList));
    displayTask();
}

//Update Functionality 

function updateTask(index){
    taskInputEl.value=taskList[index];
    taskList.splice(index,1);
    localStorage.setItem('tasks',JSON.stringify(taskList));
    displayTask();

    
}


// Toggle theme functionality
themeToggleEl.addEventListener('change', function() {
    let theme = themeToggleEl.checked ?  'dark' :'light';
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
});


