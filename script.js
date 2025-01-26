let input = document.querySelector("input[type='text']");
let myform = document.querySelector("form");

let dueTasks = document.querySelector(".due-tasks");
let doneTasks = document.querySelector(".done-tasks");


function listDueTask(){
    let taskArray = window.localStorage.getItem("due-tasks").split(":-:")
    taskArray.forEach(function(task){
        if (task !== ""){
            addDueTask(task);
        }
    })
};
function listDoneTask(){
    let taskArray = window.localStorage.getItem("done-tasks").split(":-:")
    taskArray.forEach(function(task){
        if (task !== ""){
            addDoneTask(task);
        }
    })
};

listDueTask();
listDoneTask();


function addDueTaskLocal(text){
    let taskArray = window.localStorage.getItem("due-tasks").split(":-:");
    taskArray.push(text);
    window.localStorage.setItem("due-tasks", taskArray.join(":-:"));
};

function removeDueTaskLocal(text){
    let taskArray = window.localStorage.getItem("due-tasks").split(":-:")
    let index = taskArray.indexOf(text);
    if (index !== -1) { 
    taskArray.splice(index, 1);
    }
    window.localStorage.setItem("due-tasks", taskArray.join(":-:"));
};

function addDoneTaskLocal(text){
    let taskArray = window.localStorage.getItem("done-tasks").split(":-:");
    taskArray.push(text);
    window.localStorage.setItem("done-tasks", taskArray.join(":-:"));
};

function removeDoneTaskLocal(text){
    let taskArray = window.localStorage.getItem("done-tasks").split(":-:")
    let index = taskArray.indexOf(text);
    if (index !== -1) { 
    taskArray.splice(index, 1);
    }
    window.localStorage.setItem("done-tasks", taskArray.join(":-:"));
};



function addDueTask(text){
    let newTask = document.createElement("div");
    newTask.className = "task";

    let myCheckbox = document.createElement("input");
    myCheckbox.type = "checkbox";

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
        removeDueTaskLocal(text);
    }
    myCheckbox.onchange = function(){
        let parent = rmvBtn.parentNode;
        parent.remove();
        removeDueTaskLocal(text);
        addDoneTask(text);
        addDoneTaskLocal(text);
    }

    rmvBtn.className = "removeTask";
    newTask.appendChild(myCheckbox);
    newTask.appendChild(taskText);
    newTask.appendChild(rmvBtn);
    
    dueTasks.appendChild(newTask);

};

function addDoneTask(text){
    let newTask = document.createElement("div");
    newTask.className = "doneTask";

    let taskText = document.createElement("div");
    let textnode = document.createTextNode(text);
    taskText.appendChild(textnode);
    taskText.className = "textTask";

    newTask.appendChild(taskText);

    doneTasks.appendChild(newTask);

};

myform.onsubmit = function(event){
    addDueTask(input.value);
    addDueTaskLocal(input.value);
};
