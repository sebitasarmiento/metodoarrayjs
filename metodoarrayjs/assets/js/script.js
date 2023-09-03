const btn = document.getElementById("btn");
const input = document.getElementById("input");
const total = document.getElementById("total");
const realizadas = document.getElementById("realizadas");
const tareaEscrita = document.getElementById("Tarea");
let listaTareas = [
    { id: 1, name: "Ir al gym", done: false },
    { id: 2, name: "Estudiar ", done: false },
    { id: 3, name: "Meditar", done: false },
];

const cargarTarea = () => {
    tareaEscrita.innerHTML = "";
    let tareasCompletas = 0;

    listaTareas.forEach((tarea) => {
        const li = document.createElement("li");
        li.id = tarea.id;

        const buttonText = tarea.done ? "Desmarcar" : "Marcar";
        const doneClass = tarea.done ? "done" : "";

        li.innerHTML = `
            <p class="${doneClass}">${tarea.name}</p>
            <button class="btn">${buttonText}</button ">
            <button class="btn delete">Eliminar</button>
        `;

        const toggleBtn = li.querySelector(".btn");
        toggleBtn.addEventListener("click", () => {
            tarea.done = !tarea.done;
            cargarTarea();
        });

        tareaEscrita.appendChild(li);

        if (tarea.done) {
            tareasCompletas++;
        }
    });

    total.textContent = listaTareas.length;
    realizadas.textContent = tareasCompletas;
    const totalTasks = listaTareas.length - tareasCompletas;
    total.textContent = totalTasks;
};

btn.addEventListener("click", () => {
    const nombreTarea = input.value;

    listaTareas.push({
        id: Date.now(),
        name: nombreTarea,
        done: false,
    });

    input.value = "";
    cargarTarea();
});

tareaEscrita.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
        const id = e.target.parentNode.id;
        eliminarTarea(id);
    }
});

const eliminarTarea = (id) => {
    listaTareas = listaTareas.filter((tarea) => tarea.id != id);
    cargarTarea();
};

cargarTarea();
