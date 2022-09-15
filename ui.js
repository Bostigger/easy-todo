import Storage from "./storage.js";
import task from "./task.js";

const ls = new Storage();

function UI() {
    UI.prototype.addToUi = (task)=>{
        ls.storeTasks(task);
        const newHtml =
            `<div class="task" data-createdat="${task.id}">
                <div class="task__details" >
                  <input type="checkbox" class="task-check" />
                  <label class="task-title">${task.title}</label>
                </div>
                <div class="task__op">
                  <ion-icon class="task__op_edit" name="create-outline"></ion-icon>
                  <ion-icon class="task__op_delete" name="trash-outline"></ion-icon>
                </div>
              </div>
            `
        document.querySelector('.task-list').insertAdjacentHTML('afterbegin',newHtml);
    }

    UI.prototype.deleteTask = (e)=>{
        const task = e.target.parentElement.parentElement;
        const taskId = task.dataset.createdat;
        ls.deletemyTask(taskId);
        task.remove();
    }


    UI.prototype.completeTask = (e)=>{
        const task = e.target.parentElement.parentElement;
        const taskId = task.dataset.createdat;
        ls.updateTask(taskId);
        task.classList.toggle('completed');
    }


    UI.prototype.EditTask=(e)=>{
        const task = e.target.parentElement.parentElement;
        const taskId = task.dataset.createdat;
        const taskData = ls.findTask(taskId);
        document.querySelector('#newtaskID').value=taskData.title;
        document.querySelector('#updateThisTask').value = taskData.id;

        document.querySelector('.EditTaskBtn').style.display='inline';
        document.querySelector('.CancelTaskBtn').style.display='inline';
        document.querySelector('.AddTaskBtn').style.display='none';

        document.querySelector('.CancelTaskBtn').addEventListener('click',(e)=>{
            document.querySelector('.EditTaskBtn').style.display='none';
            document.querySelector('.CancelTaskBtn').style.display='none';
            document.querySelector('.AddTaskBtn').style.display='inline';
            document.querySelector('#newtaskID').value='';
            document.querySelector('#updateThisTask').value = '';

        });
    }


    UI.prototype.updateMyTask =(e)=>{
        const task = document.querySelector('#newtaskID').value;
        const taskId = document.querySelector('#updateThisTask').value;
        const allTasks = document.querySelectorAll('.task-title');
        if(task.length>0){
            ls.updateMyNewTask(task,taskId);
            allTasks.forEach((title)=>{
                if(title.parentElement.parentElement.dataset.createdat === taskId ){
                    title.innerText = task
                }
            })
        }
        document.querySelector('#newtaskID').value='';
        document.querySelector('#updateThisTask').value='';

        document.querySelector('.EditTaskBtn').style.display='none';
        document.querySelector('.CancelTaskBtn').style.display='none';
        document.querySelector('.AddTaskBtn').style.display='inline';
    }
}

export default UI;