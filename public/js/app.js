$(document).ready(() => {
    $.getJSON("/api/todos")
    .then(addTodos)

    $('#todoInput').keypress(e => {
        if (e.which == 13) {
            createTodo();
        }
    })
});

function createTodo() {
    // send request to create todo
    let usrInput = $('#todoInput').val();
    $.post('/api/todos', { name: usrInput })
    .then(newTodo => {
        $('#todoInput').val('');
        addTodo(newTodo);
    })
    .catch(err => {
        console.log(err);
    })
}

function addTodo(todo) {
    const newTodo = $(`<li class="task">${todo.name}</li>`);
    if (todo.completed) {
        newTodo.addClass('done');
    }
    $('.list').append(newTodo);
}

function addTodos(todos) {
    // add todos to page
    todos.forEach(todo => {
        addTodo(todo);
    });
}