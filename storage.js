import task from "./task.js";

function Storage() {
    Storage.prototype.getTasks = ()=>{
        let tasks = localStorage.getItem('tasks');
        if(tasks){
            tasks = JSON.parse(tasks);
        }else{
            tasks = [];
        }
        return tasks;
    }
    Storage.prototype.storeTasks = (task)=>{
        const tasks = this.getTasks();
        tasks.unshift(task);
        document.querySelector('#number__tasks').innerText=tasks.length;
        localStorage.setItem('tasks',JSON.stringify(tasks));
    }

    const tasks = this.getTasks();
    let compCount=0;
    for(let tk of tasks){
        if(tk.taskCompleted){
            compCount+=1;
        }
    }

    Storage.prototype.deletemyTask =(id)=>{
        const tasks = this.getTasks();
        const taskIdx = tasks.findIndex((task)=>task.id===id);
        tasks.splice(taskIdx,1);
        document.querySelector('#number__tasks').innerText=tasks.length;
        document.querySelector('#completed__tasks').innerText=compCount;
        localStorage.setItem('tasks',JSON.stringify(tasks));
    }

    Storage.prototype.updateTask = (id)=>{
        let compCount=0;
        document.querySelector('#completed__tasks').innerText=compCount;
        const tasks = this.getTasks();
        const index = tasks.findIndex((task)=>task.id===id);
        tasks[index].taskCompleted = !tasks[index].taskCompleted;
        localStorage.setItem('tasks',JSON.stringify(tasks));
        for(let tk of tasks){
            if(tk.taskCompleted){
                compCount +=1;
                document.querySelector('#completed__tasks').innerText=compCount;
            }
        }
    }

    Storage.prototype.findTask=(id)=>{
        const tasks = this.getTasks();
        return tasks.find((task)=>task.id===id);
    }

    Storage.prototype.updateMyNewTask=(taskTitle,id)=>{
        const tasks = this.getTasks();
        const index = tasks.findIndex((task)=>task.id===id);
        tasks.find((task)=>{
            if(task.id===id){
                tasks[index].title = taskTitle
            }
        })
        document.querySelector('#number__tasks').innerText=tasks.length;
        localStorage.setItem('tasks',JSON.stringify(tasks));
    }

}export default Storage;