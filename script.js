let tasks = []

const SESSION_NAME = "todo"

function getTasks() {
    tasks = JSON.parse(sessionStorage.getItem(SESSION_NAME))
}

function addTask(name, status) {
    // create task object
    let task =  {"name": name, "status": status}
    // append task to task list
    tasks.push(task)
    // save task list to session storage
    sessionStorage.setItem(SESSION_NAME, JSON.stringify(tasks))

}

function filterTasks(status) {
    tasks.filter(t=>{t.status === status})
}

function displayTasks(tasks, status) {
    let taskList = document.getElementById("task-list")


}