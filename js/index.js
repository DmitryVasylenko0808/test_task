window.addEventListener("load", () => {
    const todos = [
        { id: 0, title: "Выгулять собаку", desc: "Выгулять собаку в парке", status: false, children: [] },
        {
            id: 1,
            title: "Купить продукты",
            desc: "",
            status: false,
            children: [
                { id: 10, title: "Купить фрукты", desc: "", status: false, children: [] },
                { id: 11, title: "Купить овощи", desc: "", status: false, children: [] },
                {
                    id: 12,
                    title: "Купить молочные продукты",
                    desc: "",
                    status: false,
                    children: [
                        { id: 120, title: "Купить творог", desc: "", status: false, children: [] },
                        { id: 121, title: "Купить кефир", desc: "", status: false, children: [] },
                    ]
                },
            ]
        },
        { id: 2, title: "Заправить машину", desc: "", status: false, children: [] },
    ];

    const app = document.getElementById("app");
    const form = document.getElementById("form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const todo = {
            title: e.target.title.value,
            desc: e.target.desc.value,
            status: false
        }
        addTodo(todos, todo);
    })

    app.appendChild(showTodos(todos));
})