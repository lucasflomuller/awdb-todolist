$(document).ready(() => {
    $.getJSON("/api/todos")
    .then(addTodos)
});

function addTodos(todos) {
    // add todos to page
    todos.forEach(todo => {
        const newTodo = $(`<li class="task">${todo.name}</li>`);
        $('.list').append(newTodo);
    });
}