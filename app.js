console.log("welcome!");
showTasks();
let addBtn = document.getElementById('addBtn');
let modal = document.getElementById("myModal");


//add a task
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById('addTxt');
    let addTitle = document.getElementById('addTitle');
    let tasks = localStorage.getItem("tasks");
    let titles = localStorage.getItem("titles");
    if (tasks == null) {
        tasksObj = [];
        titlesObj = [];
    } else {
        tasksObj = JSON.parse(tasks);
        titlesObj = JSON.parse(titles)
    }
    if (addTxt.value != "")
        tasksObj.push(addTxt.value);
    else tasksObj.push("Please add Task Description!")
    if (addTitle.value != "")
        titlesObj.push(addTitle.value);
    else titlesObj.push("Unknown Task")
    localStorage.setItem("tasks", JSON.stringify(tasksObj));
    localStorage.setItem("titles", JSON.stringify(titlesObj));
    addTxt.value = "";
    addTitle.value = "";
    // console.log(tasksObj);
    showTasks();

});
//show the tasks
function showTasks() {
    let tasks = localStorage.getItem("tasks");
    let titles = localStorage.getItem("titles");
    if (tasks == null) {
        tasksObj = [];
        titlesObj = [];
    } else {
        tasksObj = JSON.parse(tasks);
        titlesObj = JSON.parse(titles);

    }
    let html = "";
    tasksObj.forEach(function (element, index) {
        // console.log(titlesObj[index]);

        html += `
         <div class="taskCard my-2 mx-2 card" style="width:24rem;">
         <div class="task-title my-2">
         <h3 class="my-1 card-title"> ${titlesObj[index]}</h3><hr>
         </div>
        <div class="task-body">
            <p class="card-text">${element}</p>
        </div> 
        <div class="buttons my-1">
        <button id="${index}" onClick="deleteTask(this.id)" class="btn btn-primary addBtn">Delete Task</button>
        <button id="flag${index}" onClick="flagTask(this.id)" class="btn btn-primary addBtn">Flag Task</button>
        <button id="edit${index}" onClick="editTask(this.id)" class="btn btn-primary addBtn">Edit Task</button>
        </div> 
    </div>`;
    });
    let tasksElm = document.getElementById('tasks');
    if (tasksObj.length != 0)
        tasksElm.innerHTML = html;
    else {
        tasksElm.innerHTML = `<br>Nothing to show! Please use "Add a task" section above to add tasks.`
        tasksElm.style.color = "aliceblue";
    }
}
//delete the task
function deleteTask(index) {
 
    let tasks = localStorage.getItem("tasks");
    let titles = localStorage.getItem("titles");

    if (tasks == null) {
        tasksObj = [];
        titlesObj = [];
    } else {
        tasksObj = JSON.parse(tasks);
        titlesObj = JSON.parse(titles);
    }

    tasksObj.splice(index, 1);
    titlesObj.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasksObj));
    localStorage.setItem("titles", JSON.stringify(titlesObj));

    showTasks();

}
//flag Task
function flagTask(c) {
    let id = c;
    let index = parseInt(c.replace("flag", ""));
    let tasks = document.getElementById('tasks');
    let card = tasks.getElementsByClassName('taskCard')[index];
    let cardTitle=card.getElementsByClassName('card-title')[0];
    let button = card.getElementsByTagName('button')[1];

    if (button.innerText == "Unflag Task") {
        button.innerText = "Flag Task";
        card.style.background = "rgb(165, 182, 190)";

    } else {
        button.innerText = "Unflag Task";
        card.style.background = "rgb(127,255,212)";
        cardTitle.style.color="rgb(140, 63, 28)";
    }
    button.style.background= "rgb(23, 39, 57)";
    button.style.border="rgb(255, 255, 255)";

}
function editTask(c) {
    let id = c;
    let index = parseInt(c.replace("edit", ""));
    let tasksCard = document.getElementById('tasks');
    let card = tasksCard.getElementsByClassName('taskCard')[index];
    let cardTitle = card.getElementsByClassName('card-title')[0];
    let cardTxt = card.getElementsByClassName('card-text')[0];
    let taskEdit = modal.getElementsByClassName('taskEdit')[0];
    let editArea = modal.getElementsByClassName('editArea')[0];
    taskEdit.innerText = cardTitle.innerText;
    editArea.innerText = cardTxt.innerText;
    modal.style.display = "block";
    let span = document.getElementsByClassName("close")[0];
    span.onclick = function () {
        modal.style.display = "none";

    }
    let submitBtn = document.getElementById('submitBtn');
    submitBtn.onclick = function () {
        let tasks = localStorage.getItem("tasks");
        tasksObj = JSON.parse(tasks);
        tasksObj[index] = editArea.value;
        localStorage.setItem("tasks", JSON.stringify(tasksObj));
        modal.style.display = "none";
        showTasks();

    }



}





//search task
let search = document.getElementById('searchTask');
search.addEventListener("input", function () {
    let inputVal = search.value.toLowerCase();
    let taskCard = document.getElementsByClassName('taskCard');
    Array.from(taskCard).forEach(function (element) {
        let cardTxt = element.getElementsByClassName('card-text')[0].innerText;
        let cardTitle = element.getElementsByClassName('card-title')[0].innerText;
        if (cardTxt.includes(inputVal) || cardTitle.includes(inputVal))
            element.style.display = "block";
        else
            element.style.display = "none";
    });

});



// // Get the button that opens the modal
// var btn = document.getElementById("myBtn");

// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];

// // When the user clicks on the button, open the modal
// btn.onclick = function () {
//     modal.style.display = "block";
// }

// // When the user clicks on <span> (x), close the modal
// span.onclick = function () {
//     modal.style.display = "none";
// }

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function (event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
// }
