// Fetch existing todos from local storage
const getSavedTodos = () => {
    const todosJSON = localStorage.getItem("todos");
    try {
        return todosJSON ? JSON.parse(todosJSON) : [];
    } catch (error) {
        return []
    }
}

// Save todos to local storage
const saveTodos = (todos) => {
    return localStorage.setItem("todos", JSON.stringify(todos));
}

// Get the DOM elements for an individual note
const generateDOM = (todo) => {
    const todoEl = document.createElement("div");
    const textEl = document.createElement("span");
    const button = document.createElement("button");
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.checked = todo.completed;
    button.textContent = "x";
    todoEl.appendChild(checkbox);
    textEl.textContent = todo.text;
    todoEl.appendChild(textEl);
    todoEl.appendChild(button);

    return todoEl;
}
// Change status of a task as a complete (or not complete too?)
const changeComplete = (cbox, todo) => {
    if (cbox.target.checked) {
        // confirm("Are you sure that task is complete?");
        todos[todo].completed = true;
        renderTodos(todos, filters);
        saveTodos(todos);
        return
    } else {
        todos[todo].completed = false;
        renderTodos(todos, filters);
        saveTodos(todos);
        return
    }
}


// Render application todos based on filters
const renderTodos = (todos, filters) => {
    const todoContainer = document.querySelector("#todos");
    const filteredTodos = todos.filter((todo) => {
        let filtered = todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
        if (!filters.isCompleted) {
            return filtered;
        } else {
            return filtered && !todo.completed;
        }
    });

    const incompleteTodos = todos.filter((todo) => {
        return !todo.completed
    });

    todoContainer.textContent = "";

    const summary = generateSummaryDOM(incompleteTodos);
    todoContainer.appendChild(summary);

    filteredTodos.forEach(todo => {
        const todoEl = generateDOM(todo);
        todoContainer.appendChild(todoEl);
    });


    let btns = document.querySelectorAll("div button");
    btns = Array.from(btns);
    btns.forEach((btn, index) => {
        btn.addEventListener("click", (btn) => {
            todos.splice(index);
            btn.target.parentElement.remove();
            saveTodos(todos);
            renderTodos(todos, filters)
        })
    });

    let checkboxes = document.querySelectorAll("div input");
    checkboxes = Array.from(checkboxes);
    checkboxes.forEach((cbox, todo) => {
        cbox.addEventListener("change", (cbox) => {
            changeComplete(cbox, todo);
        })
    });
}

// Get the DOM elements for list summary
const generateSummaryDOM = (incompleteTodos) => {
    const summary = document.createElement("h2");
    summary.textContent = `You have ${incompleteTodos.length} todos left.`;
    return summary;
}