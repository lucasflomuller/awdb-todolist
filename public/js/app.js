$(document).ready(() => {
    $.getJSON("/api/todos")
    .then(addTodos)

    // Create todo event
    $('#todoInput').keypress(function(e) {
        if (e.which == 13 && $(this).val()) {
            createTodo();
        }
    });

    // Remove todo event
    $('.list').on('click', 'span', function() {
        removeTodo($(this).parent());
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
    // Add single todo
    let newTodo = $(`<li class="task">
                            ${todo.name}
                            <span>X</span>
                     </li>`);
    newTodo.data({id: todo._id});
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

function removeTodo(todo) {
    const clickedId = todo.data('id');
    const deleteUrl = `/api/todos/${clickedId}`;
    $.ajax({
        method: 'DELETE',
        url: deleteUrl
    })
    .then(data => {
        console.log(data.message)
        todo.remove();
    })
    .catch(err => {
        console.log(err);
    });
}