let allTasks = []

const SESSION_NAME = "todo"

//reading tasks from session storage
function readTasks() {
    allTasks = JSON.parse(sessionStorage.getItem(SESSION_NAME))

}
//function to save tasks
function saveTasks() {
    sessionStorage.setItem(SESSION_NAME, JSON.stringify(allTasks));
}


//adding tasks
function addTask(name, isImportant, isCompleted = false) {
    // create task object
    let task = { "name": name, "isImportant": isImportant, "isCompleted": isCompleted }
    // append task to task list
    allTasks.push(task)
    // save task list to session storage
    saveTasks()

    displayAllTasks()

    displayTaskSummary()
}



//function to display task list

function displayTasks(tasks) {
    const taskList = document.querySelector('.ul-list')

    // clear task list
    taskList.innerHTML = ''

    

    //loop through tasks
    tasks.forEach((task, index) => {
        //create task element
        const taskElement = document.createElement('tr')

        //create tables for the task lists
        let tables = `
       <td><input type ="checkbox" onchange ="toggleTaskCompletion(${index})" ${task.isCompleted ? 'checked' : ''}></td>

       <td>${task.name}</td>

       <td><div onclick="toggleImportant(${index})"> <i class ="bi ${task.isImportant ? "bi-star-fill" : "bi-star"}"></i></div></td>

       <td><button onclick = ""><i class ="bi bi-bin"></i></button></td>
       
       `

        taskElement.innerHTML = tables

        //add task element to task list
        taskList.append(taskElement)
    })
}


//function to toggle task completion
function toggleTaskCompletion(index) {
    allTasks[index].isCompleted = !allTasks[index].isCompleted
    saveTasks()
    displayAllTasks()
    displayTaskSummary()
}

//function toggle task importance
function toggleImportant(index) {
    allTasks[index].isImportant = !allTasks[index].isImportant
    saveTasks()
    displayAllTasks()
    displayTaskSummary()
}

//function to delete
function deleteTask(index) {
    allTasks.splice(index, 1)
    saveTasks()
    displayAllTasks()
    displayTaskSummary()
}


//For filtering
function getCompletedTasks() {
    return allTasks.filter(t => t.isCompleted)
}

function getImportantTasks() {
    return allTasks.filter(t => t.isImportant)

}

//search functionality
function filterSearch(searchterm) {
    return allTasks.filter(s =>  s.name.toLowerCase().includes(searchterm))
    
}



//Function to get each to display in their respective cards

function allTasksCount() {
    return allTasks.length
}

function completedTaskCount() {
    return getCompletedTasks().length
}

function importantTaskCount() {
    return getImportantTasks().length
}

//function to display the content of each
function displayTaskSummary() {
    const alltasks = document.querySelector('#all-task-count')
    const completedTasks = document.querySelector('#completed-task-count')
    const importantTasks = document.querySelector('#important-task-count')
    alltasks.textContent = allTasksCount()
    completedTasks.textContent = completedTaskCount()
    importantTasks.textContent = importantTaskCount()
}

function displayCompletedTasks() {
    displayTasks(getCompletedTasks())
}

function displayImportantTasks() {
    displayTasks(getImportantTasks())
}

function displayAllTasks() {
    displayTasks(allTasks)
}


//event to still display content when window is refreshed

window.addEventListener('load', (e) => {
    readTasks()
    displayTaskSummary();
    displayAllTasks()


    //variable for each card
    const allCard = document.querySelector('.cards.all')
    const completedCard = document.querySelector('.cards.completed')
    const importantCard = document.querySelector('.cards.important')
    const searchfield = document.querySelector('#search')

    // add event listeners
    allCard.addEventListener('click', () => {
        displayAllTasks()
    })

    completedCard.addEventListener('click', () => {
        displayCompletedTasks()
    })

    importantCard.addEventListener('click', () => {
        displayImportantTasks()
    })

    searchfield.addEventListener('input', () => {
        let searchWord = searchfield.value.trim().toLowerCase()
        if (searchWord.length === 0) {
           displayAllTasks()
        }
        let filteredTasks = filterSearch(searchWord)
        // if (filteredTasks.length === 0) {
        //     displayTasks(['']) 
        // } 
        displayTasks(filteredTasks)
    })
})





