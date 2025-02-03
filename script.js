let input = document.querySelector("input[type='text']");
let myform = document.querySelector("form");
let dueTasks = document.querySelector(".due-tasks");
let doneTasks = document.querySelector(".done-tasks");
let empty = document.querySelector(".empty");
let clearBtn = document.querySelector(".clear");

input.focus();

setInterval(function(){
    if (window.localStorage.getItem("due-tasks") === JSON.stringify([]) || window.localStorage.getItem("due-tasks") === null){
        empty.style.display = "block";
    }else{
        empty.style.display = "none";
    }
    if (window.localStorage.getItem("done-tasks") === JSON.stringify([]) || window.localStorage.getItem("done-tasks") === null){
        clearBtn.style.display = "none";
    }else{ 
        clearBtn.style.display = "block";

    }
}, 1)

clearBtn.onclick = function(){
    window.localStorage.setItem("done-tasks", JSON.stringify([]));
    doneTasks.innerHTML = "";
}

function listDueTask(){
    if (window.localStorage.getItem("due-tasks") === null){
        window.localStorage.setItem("due-tasks", JSON.stringify([]));
    }else {
        let taskArray = JSON.parse(window.localStorage.getItem("due-tasks"));
        taskArray.forEach(function(task){
            if (task !== ""){
                addDueTask(task);
            }
        })
    }
};
function listDoneTask(){
    if (window.localStorage.getItem("done-tasks") === null){
        window.localStorage.setItem("done-tasks", JSON.stringify([]));
    }else{
        let taskArray = JSON.parse(window.localStorage.getItem("done-tasks"));
        taskArray.forEach(function(task){
            if (task !== ""){
                addDoneTask(task);
            }
        })
    }   
};

listDueTask();
listDoneTask();


function addDueTaskLocal(text){
    let taskArray = JSON.parse(window.localStorage.getItem("due-tasks"));
    taskArray.push(text);
    window.localStorage.setItem("due-tasks", JSON.stringify(taskArray));
};

function removeDueTaskLocal(text){
    let taskArray = JSON.parse(window.localStorage.getItem("due-tasks"));
    let index = taskArray.indexOf(text);
    if (index !== -1) { 
    taskArray.splice(index, 1);
    }
    window.localStorage.setItem("due-tasks", JSON.stringify(taskArray));
};

function addDoneTaskLocal(text){
    let taskArray = JSON.parse(window.localStorage.getItem("done-tasks"));
    taskArray.push(text);
    window.localStorage.setItem("done-tasks", JSON.stringify(taskArray));
};

function removeDoneTaskLocal(text){
    let taskArray = JSON.parse(window.localStorage.getItem("done-tasks"));
    let index = taskArray.indexOf(text);
    if (index !== -1) { 
    taskArray.splice(index, 1);
    }
    window.localStorage.setItem("done-tasks", JSON.stringify(taskArray));
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
        setTimeout(function(){
            let parent = rmvBtn.parentNode;
            parent.remove();
            removeDueTaskLocal(text);
            addDoneTask(text);
            addDoneTaskLocal(text);
        }, 200 )
        
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
