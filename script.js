let input = document.querySelector("input[type='text']");
let myform = document.querySelector("form");
let dueTasks = document.querySelector(".due-tasks");
let doneTasks = document.querySelector(".done-tasks");
let empty = document.querySelector(".empty");
let clearBtn = document.querySelector(".clear");
let reset = document.querySelector(".reset");

reset.onclick = function(){
    window.localStorage.setItem("counter", "1");
    window.localStorage.setItem("due-tasks", JSON.stringify({}));
    window.localStorage.setItem("done-tasks", JSON.stringify([]));
    location.reload();
}

input.focus();
let counter;
if (window.localStorage.getItem("counter") === null){
    counter = "1";
    window.localStorage.setItem("counter", "1");
}else{
    counter = window.localStorage.getItem("counter");
}

function incrementCounter(){
    let a = parseInt(counter);
    a++;
    counter = `${a}`;
    window.localStorage.setItem("counter", counter);
}

setInterval(function(){
    if (window.localStorage.getItem("due-tasks") === JSON.stringify({}) || window.localStorage.getItem("due-tasks") === null){
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
        window.localStorage.setItem("due-tasks", JSON.stringify({}));
    }else {
        let taskObj = JSON.parse(window.localStorage.getItem("due-tasks"));
        for (let [id, text] of Object.entries(taskObj)){
            addDueTask(id, text);
        }
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


function addDueTaskLocal(id, text){
    let taskObj = JSON.parse(window.localStorage.getItem("due-tasks"));
    taskObj[id] = text;
    window.localStorage.setItem("due-tasks", JSON.stringify(taskObj));
};

function editDueTaskLocal(id, newText){
    let taskObj = JSON.parse(window.localStorage.getItem("due-tasks"));
    taskObj[id] = newText;
    window.localStorage.setItem("due-tasks", JSON.stringify(taskObj));
}

function removeDueTaskLocal(id){
    let taskObj = JSON.parse(window.localStorage.getItem("due-tasks"));
    delete taskObj[id];
    window.localStorage.setItem("due-tasks", JSON.stringify(taskObj));
};

function addDoneTaskLocal(id){
    let taskObj = JSON.parse(window.localStorage.getItem("due-tasks"));
    let taskArray = JSON.parse(window.localStorage.getItem("done-tasks"));
    taskArray.push(taskObj[id]);
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



function addDueTask(id, text){
    let newTask = document.createElement("div");
    newTask.className = "task";

    let myCheckbox = document.createElement("input");
    myCheckbox.type = "checkbox";

    let taskText = document.createElement("div");
    let textnode = document.createTextNode(text);
    taskText.appendChild(textnode);
    taskText.className = "textTask";

    let Btns = document.createElement("div");
    Btns.className = "btns";
    
    let editBtn = document.createElement("div");
    editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
    editBtn.className = "editTask";

    let confirmBtn = document.createElement("div");
    confirmBtn.innerHTML = '<i class="fa-solid fa-check">';
    confirmBtn.className = "confirmTask";

    let rmvBtn = document.createElement("div");
    rmvBtn.innerHTML = '<i class="fa-solid fa-trash"></i>'
    rmvBtn.className = "removeTask";

    Btns.appendChild(editBtn);
    Btns.appendChild(confirmBtn);
    Btns.appendChild(rmvBtn);
    


    rmvBtn.onclick = function(){
        newTask.remove();
        removeDueTaskLocal(id);
    }
    myCheckbox.onchange = function(){
        setTimeout(function(){
            newTask.remove();
            addDoneTask(id);
            addDoneTaskLocal(id);
            removeDueTaskLocal(id);        
        }, 200 )
    }
    editBtn.onclick = function(){
        taskText.contentEditable = true;
        editBtn.style.display = "none";
        confirmBtn.style.display = "block";
    }
    confirmBtn.onclick = function(){
        taskText.contentEditable = false;
        let newText = taskText.textContent;
        editDueTaskLocal(id, newText)
        editBtn.style.display = "block";
        confirmBtn.style.display = "none";
    }

    newTask.appendChild(myCheckbox);
    newTask.appendChild(taskText);
    newTask.appendChild(Btns);
    
    dueTasks.appendChild(newTask);

};

function addDoneTask(id){ 
    let taskObj = JSON.parse(window.localStorage.getItem("due-tasks"));
    let newTask = document.createElement("div");
    newTask.className = "doneTask";

    let taskText = document.createElement("div");
    let textnode = document.createTextNode(taskObj[id]);
    taskText.appendChild(textnode);
    taskText.className = "textTask";

    newTask.appendChild(taskText);

    doneTasks.appendChild(newTask);

};

myform.onsubmit = function(event){
    if (input.value){
        addDueTask(counter, input.value);
        addDueTaskLocal(counter, input.value);
        incrementCounter();
    }else{
        event.preventDefault();
    }
    
};
