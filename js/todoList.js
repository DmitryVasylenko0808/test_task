const showTodos = (todos) => {
    return todos.reduce((ul, item) => {
        const { children, ...todo } = item;
        console.log(todo);

        const li = createTodoItem(todos, todo)

        if (item.children.length) {
            const innerList = showTodos(item.children);
            li.appendChild(innerList);
        }

        ul.appendChild(li);
        return ul;
    }, document.createElement("ul"))
};

const addTodo = (todos, todo, id) => {
    debugger;
    if (id === undefined) {
        const t = {
            id: todos.length,
            ...todo,
            children: []
        };
        todos.push(t);

        const ul = document.getElementsByTagName("ul");
        const li = createTodoItem(todos, t);

        ul[0].appendChild(li);
    } else {
        todos.forEach((item) => {
            if (item.id === id) {
                const t = {
                    id: `${item.id}${item.children.length}`,
                    ...todo,
                    children: []
                };
                item.children.push(t);

                const current = document.getElementById(item.id);
                let ul = current.getElementsByTagName("ul");
                const li = createTodoItem(todos, t);

                console.log(ul);
                if (ul.length) {
                    ul[0].appendChild(li);
                } else {
                    ul = document.createElement("ul");
                    ul.appendChild(li);
                    current.appendChild(ul);
                }

                return;
            }
            if (item.children.length) {
                addTodo(item.children, todo, id);
            }
        })
    };
};

const deleteTodo = (todos, id) => {
    todos.forEach((item) => {
        if (item.id === id) {
            todos.splice(todos.findIndex((t) => t.id === id), 1);

            const li = document.getElementById(item.id);
            li.remove();

            return;
        }
        if (item.children.length) {
            deleteTodo(item.children, id);
        }
    })
};

const editTodo = (todos, id, data) => {
    for (let item of todos) {
        if (item.id === id) {
            item.title = data.title;
            item.desc = data.desc;

            const li = document.getElementById(item.id);
            const span = li.getElementsByTagName("span");
            span[0].textContent = item.title;

            const p = li.getElementsByTagName("p");

            if (!p.length && item.desc) {
                const paragraph = document.createElement("p");
                paragraph.textContent = `Описание: ${item.desc}`;
                li.appendChild(paragraph);
            } else if (p.length && !item.desc) {
                p[0].remove();
            } else {
                p[0].textContent = `Описание: ${item.desc}`;
            }

            return;
        }
        if (item.children.length) {
            editTodo(item.children, id, data);
        }
    };
};

const toggleTodo = (todos, status, id) => {
    todos.forEach((item) => {
        if (id === undefined) {
            item.status = status;

            const li = document.getElementById(item.id);
            const checkbox = li.getElementsByTagName("input");
            checkbox[0].checked = status;

            if (item.children.length) {
                toggleTodo(item.children, status);
            }
        }

        if (item.id === id) {
            item.status = status;

            const li = document.getElementById(item.id);
            const checkbox = li.getElementsByTagName("input");
            checkbox[0].checked = status;

            if (item.children.length) {
                toggleTodo(item.children, status);
            }
        } else {
            if (item.children.length) {
                toggleTodo(item.children, status, id);
            }
        }
    })
};