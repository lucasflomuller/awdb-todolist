$(document).ready(() => {
    $.getJSON("/api/todos")
    .then(addTodos)

    // Create todo event
    $('#todoInput').keypress(function(e) {
        if (e.which == 13 && $(this).val()) {
            createTodo();
        }
    });

    // Toggle completed event
    $('.list').on('click', 'li', function() {
        updateTodo($(this));
    });

    // Remove todo event
    $('.list').on('click', 'span', function(e) {
        e.stopPropagation();
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
    newTodo.data({
        id: todo._id,
        completed: todo.completed
    });
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

function updateTodo(todo) {
    const isDone = !todo.data('completed');
    const updateData = { completed: isDone }
    $.ajax({
        method: 'PUT',
        url: `/api/todos/${todo.data('id')}`,
        data: updateData
    })
    .then(updatedTodo => {
        todo.toggleClass("done");
        todo.data('completed', isDone);
    })
}

function removeTodo(todo) {
    const clickedId = todo.data('id');
    const deleteUrl = `/api/todos/${clickedId}`;
    $.ajax({
        method: 'DELETE',
        url: deleteUrl
    })
    .then(data => {
        todo.remove();
    })
    .catch(err => {
        console.log(err);
    });
}
