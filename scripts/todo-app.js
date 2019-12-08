let todos = getSavedTodos();


// Filters object to store latest filter
const filters = {
    searchText: "", // Empty by default, but live changing
    isCompleted: false
}

const form = document.querySelector("#todo-form");


renderTodos(todos, filters);

const btn = document.querySelector("#todo");
const input = document.querySelector("#filter-todo");
const checkbox = document.querySelector("#hide-checkbox");


input.addEventListener("input", (e) => {
    filters.searchText = e.target.value;
    renderTodos(todos, filters);
});


form.addEventListener("submit", (e) => {
    e.preventDefault();
    let obj = {};
    // obj.id = uuidv4();
    obj.text = e.target.elements.todoForm.value;
    obj.completed = false;
    todos.push(obj);
    e.target.elements.todoForm.value = "";
    saveTodos(todos);
    renderTodos(todos, filters);
});

checkbox.addEventListener("change", (e) => {
    e.preventDefault();
    filters.isCompleted = e.target.checked;
    renderTodos(todos, filters);
})

