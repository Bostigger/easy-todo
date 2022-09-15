function Task(title) {
    this.id = new Date().toLocaleString();
    this.title = title;
    this.taskCompleted = false;
}export default Task;