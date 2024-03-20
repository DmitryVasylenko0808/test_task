const showModal = (todos, id, todo) => {
    const overlay = document.querySelector(".overlay");
    overlay.classList.remove("hidden");

    const submit_btn = document.getElementById("submit_btn");
    if (todo) {
        submit_btn.textContent = "Изменить";
    } else {
        submit_btn.textContent = "Добавить";
    }

    let submitted = false;

    const cancel_btn = document.getElementById("cancel_btn");
    cancel_btn.addEventListener("click", (e) => {
        e.preventDefault();
        overlay.classList.add("hidden");
        submitted = true;
    });

    const modal_form = document.getElementById("modal_form");
    if (todo) {
        modal_form.modal_title.value = todo.title;
        modal_form.modal_desc.value = todo.desc;
    }

    modal_form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (!submitted) {
            const t = {
                title: e.target.modal_title.value,
                desc: e.target.modal_desc.value,
                status: false
            }
            overlay.classList.add("hidden");
            e.target.modal_title.value = "";
            e.target.modal_desc.value = "";

            if (todo) {
                const todo = { title: t.title, desc: t.desc };
                editTodo(todos, id, todo);
            } else {
                addTodo(todos, t, id);
            }
            submitted = true;
        }
    })
};

const createTodoItem = (todos, todo) => {
    const li = document.createElement("li");
    li.id = todo.id;
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", (e) => toggleTodo(todos, e.target.checked, todo.id));
    li.appendChild(checkbox);

    const span = document.createElement("span");
    span.textContent = todo.title;
    li.appendChild(span);

    const addBtn = document.createElement("button");
    addBtn.classList.add("btn", "btn_green");
    addBtn.textContent = "Добавить";
    addBtn.addEventListener("click", () => {
        showModal(todos, todo.id);
    })
    const editBtn = document.createElement("button");
    editBtn.textContent = "Изменить";
    editBtn.addEventListener("click", () => {
        showModal(todos, todo.id, todo);
    })
    const delBtn = document.createElement("button");
    delBtn.classList.add("btn", "btn_red");
    delBtn.textContent = "Удалить";
    delBtn.addEventListener("click", () => deleteTodo(todos, todo.id))
    li.appendChild(addBtn);
    li.appendChild(editBtn);
    li.appendChild(delBtn);

    if (todo.desc) {
        const p = document.createElement("p");
        p.textContent = `Описание: ${todo.desc}`;
        li.appendChild(p);
    }

    return li;
}