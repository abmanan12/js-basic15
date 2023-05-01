// let nowDate = new Date()
// let day = nowDate.getDay()
// let month = nowDate.getMonth()
// let date = nowDate.getDate()
// let years = nowDate.getFullYear()
// let hours = nowDate.getHours()
// let mints = nowDate.getMinutes()
// let seconds = nowDate.getSeconds()
// document.getElementById("date").innerHTML = day + " " + month + " " + date + " " + years + " " + hours + ":" + mints + ":" + seconds
document.getElementById("date").innerHTML = new Date()


// let names = prompt("Please Enter Your Name")
// document.getElementById("name").innerHTML = "Hi! " + names


function showOutput(output) {
    document.getElementById("output").innerHTML = output;
}


function getFieldValue(fieldId) {
    return document.getElementById(fieldId).value
}


function getRandomId() {
    return Math.random().toString(36).slice(2)
}

document.getElementById("addUser").style.display = "visible"
document.getElementById("updateUser").style.display = "none"

// .................................................................................................


function handleSubmit() {
    event.preventDefault()

    let title = document.getElementById("title").value
    let location = document.getElementById("location").value
    let desription = document.getElementById("description").value
    // console.log(title)
    // console.log(location)
    // console.log(desription)


    title = title.trim()
    location = location.trim()
    desription = desription.trim()

    if (title.length < 3) {
        alert("Please enter your title correctly")
        return
    }

    if (location.length < 3) {
        alert("Please enter your location correctly")
    }

    if (desription.length < 10) {
        alert("Plase enter description length Min 10")
        return
    }

    let todo = { title, location, desription }


    todo.id = getRandomId()
    todo.dateCreated = new Date().getTime()

    // var names = localStorage.getItem("todo")
    // if (names === null) {
    //     names = []
    // }
    // else {
    //     names = JSON.parse(names)
    // }

    const todos = JSON.parse(localStorage.getItem("todos")) || []
    // console.log(todos)

    todos.push(todo)

    localStorage.setItem('todos', JSON.stringify(todos))

    alert("New todo has been successfully added")

    showTodos()
    emptyFieldValues()

}



var tableStart = '<div class = "table-responsive"><table class = "table">'
var tableEnd = '</table></div>'
var tableHead = '<thead><tr><th scope = "col">#</th><th scope = "col">Title</th><th scope = "col">Location</th><th scope = "col">Description</th><th scope = "col">Action</th></tr></thead>'

var tableFormat = tableStart + '<tbody>' + tableHead + '</tbody>' + tableEnd
showOutput(tableFormat)



function showTodos() {

    const todos = JSON.parse(localStorage.getItem("todos")) || []

    if (!todos.length) {
        alert("There is not a single user availabe")
    }

    let tableBody = ''

    for (let i = 0; i < todos.length; i++) {

        let todo = todos[i]

        // tableBody += '<tr><th scope = "row">' + (i + 1) + '</th><td>' + todos[i].title + '</td><td>' + todos[i].location + '</td><td>' + todos[i].desription + '</td><td>' + '<button type="button" class="btn btn-info me-1" onclick="editTodo(event)">' + "Edit" + '</button>' + '<button type="button" class="btn btn-danger" data-value= todo.id onclick="deleteTodo()">' + "Delete" + '</button>' + '</td>'
        tableBody += `<tr><th scope = "row">  ${i + 1}  </th><td> ${todo.title} </td><td> ${todo.location} </td><td> ${todo.desription} </td><td> <button type="button" class="btn btn-info me-1 mb-1 mb-md-0" data-value= ${todo.id} onclick="editTodo(event)"> Edit </button> <button type="button" class="btn btn-danger" data-value= ${todo.id} onclick="deleteTodo(event)"> Delete </button></td>`
    }

    let table = tableStart + tableHead + "<tbody>" + tableBody + "</tbody>" + tableEnd

    // document.getElementById("output") = table
    showOutput(table)

}

function editTodo(event) {

    let todoId = event.target.getAttribute('data-value')
    // console.log(todoId)
    // return

    const todos = JSON.parse(localStorage.getItem("todos"))

    let todo = todos.find((todo) => {
        return todo.id === todoId
    })
    console.log(todo)
    // return

    // not a best way
    // const title = todo.title
    // const location = todo.location
    // const description = todo.description

    const { title, location, desription } = todo
    console.log(title, location, desription)
    // return

    document.getElementById("title").value = title
    document.getElementById("location").value = location
    document.getElementById("description").value = desription
    // return

    localStorage.setItem('editForTodo', JSON.stringify(todo))
    // return

    document.getElementById("updateUser").style.display = "block"
    // document.getElementById("addUser").style.display = "none"


}

const handleEdit = () => {

    const editForTodo = JSON.parse(localStorage.getItem("editForTodo"))

    let updateTitle = document.getElementById("title").value
    let updateLocation = document.getElementById("location").value
    let updateDesription = document.getElementById("description").value

    const updateTodo = { ...editForTodo, title: updateTitle, location: updateLocation, desription: updateDesription }

}

const deleteTodo = (event) => {

    let todoId = event.target.getAttribute('data-value')
    // console.log(todoId)
    // return

    const todos = JSON.parse(localStorage.getItem("todos"))

    let todoAfterDelete = todos.filter((todo) => {
        return todo.id !== todoId
    })
    // console.log(todos)
    // console.log(todoAfterDelete)
    // return

    localStorage.setItem('todos', JSON.stringify(todoAfterDelete))
    alert("A Todo has been successfully deleted")

    showTodos()

}

function emptyFieldValues() {

    document.getElementById("title").value = ""
    document.getElementById("location").value = ""
    document.getElementById("description").value = ""

}


// ......................................................................................................

// year in footer
let now = new Date()
let year = now.getFullYear()
document.getElementById("year").innerHTML = year
