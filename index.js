import Task from "./task.js";
import UI from "./ui.js";
import Storage from "./storage.js";


const ui = new UI();
const ls = new Storage();

const tasks = ls.getTasks();
let totalCount=0;
let totalCompleteCount=0;
let newHtml = '';
for(let task of tasks){
    if(task.taskCompleted){
        totalCompleteCount +=1;
    }
    totalCount +=1;
    newHtml +=
        `<div class="task ${task.taskCompleted ? "completed":"" }" data-createdat="${task.id}">
            <div class="task__details">
              <input type="checkbox" class="task-check"  ${task.taskCompleted ? "checked":"" } />
              <label class="task-title">${task.title}</label>
            </div>
            <div class="task__op">
              <ion-icon class="task__op_edit" name="create-outline"></ion-icon>
              <ion-icon class="task__op_delete" name="trash-outline"></ion-icon>
            </div>
          </div>
        `
        document.querySelector('.task-list').innerHTML = newHtml;

}
        document.querySelector('#number__tasks').innerText=totalCount;
        document.querySelector('#completed__tasks').innerText=totalCompleteCount;

document.querySelector('.AddTaskBtn').addEventListener('click',()=>{
    const mytask = document.querySelector('#newtaskID').value;
    const task = new Task(mytask);
    if(mytask.length) {
        ui.addToUi(task);
    }
    document.querySelector('#newtaskID').value='';

})

document.querySelector('.task-list').addEventListener('click',(e)=>{
    if(e.target.className.includes('task__op_delete')){
        ui.deleteTask(e);
    }
    if(e.target.className.includes('task-check')){
        ui.completeTask(e);
    }
    if(e.target.className.includes('task__op_edit')){
        ui.EditTask(e);
    }
})
    document.querySelector('.EditTaskBtn').addEventListener('click',(e)=>{
        ui.updateMyTask(e);
    })