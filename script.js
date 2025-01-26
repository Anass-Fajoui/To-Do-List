let input = document.querySelector("input[type='text']");
let myform = document.querySelector("form");
let tasks = document.querySelector(".tasks-container");


function listTask(){
    let taskArray = window.localStorage.getItem("tasks").split(":-:")
    taskArray.forEach(function(task){
        if (task !== ""){
            addTask(task);
        }
    })
};

listTask();

function addTaskLocal(text){
    let taskArray = window.localStorage.getItem("tasks").split(":-:");
    taskArray.push(text);
    window.localStorage.setItem("tasks", taskArray.join(":-:"));
};
function removeTaskLocal(text){
    let taskArray = window.localStorage.getItem("tasks").split(":-:")
    let index = taskArray.indexOf(text);
    if (index !== -1) { 
    taskArray.splice(index, 1);
    }
    window.localStorage.setItem("tasks", taskArray.join(":-:"));
};



function addTask(text){
    let newTask = document.createElement("div");
    newTask.className = "task";

    let taskText = document.createElement("div");
    let textnode = document.createTextNode(text);
    taskText.appendChild(textnode);
    taskText.className = "textTask";

    
    let rmvBtn = document.createElement("button");
    let rmvText = document.createTextNode("Remove");
    rmvBtn.appendChild(rmvText);


    rmvBtn.onclick = function(){
        let parent = rmvBtn.parentNode;
        parent.remove();
        removeTaskLocal(text);
    }

    rmvBtn.className = "removeTask";

    newTask.appendChild(taskText);
    newTask.appendChild(rmvBtn);
    
    tasks.appendChild(newTask);

};

myform.onsubmit = function(event){
    addTask(input.value);
    addTaskLocal(input.value);
};
