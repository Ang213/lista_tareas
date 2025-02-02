import { Todo } from "../classes"; 
import { todoList } from "..";

// Referencias HTML
const divTodoList = document.querySelector('.todo-list');
const txtinput = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

export const crearTodoHtml = (todo) => {
    const htmlTodo = `
    <li class="${(todo.completado) ? 'completed' : ''}" data-id="${todo.id}">
        <div class="view">
            <input class='toggle' type="checkbox" ${(todo.completado) ? 'checked' : ''}>
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="create a TodoMVC template">
    </li>
    `;
    const div = document.createElement('div');
    div.innerHTML = htmlTodo;
    divTodoList.append(div.firstElementChild);
    
    return div.firstElementChild;   
}

// Eventos
txtinput.addEventListener('keyup', (evento) => {
   
    if (evento.keyCode === 13 && txtinput.value.length > 0) {
        const nuevoTodo = new Todo(txtinput.value);
        todoList.nuevoTodo(nuevoTodo);

        crearTodoHtml(nuevoTodo);
        txtinput.value = '';
    } 
});

divTodoList.addEventListener('click', (evento) => {
    const nombreElemento = evento.target.localName;
    const todoElemento = evento.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id');

    if (nombreElemento.includes('input')) {
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed');
    } else if (nombreElemento.includes('button')) {
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento);
    }
});

btnBorrar.addEventListener('click', () => {
    todoList.eliminarCompletados();
    for (let i = divTodoList.children.length - 1; i >= 0; i--) {
        const elemento = divTodoList.children[i];
        if (elemento.classList.contains('completed')) {
            divTodoList.removeChild(elemento);
        }
    }
});

ulFiltros.addEventListener('click', (evento) => {
    const filtro = evento.target.innerText; 

    if (!filtro) { return; }

    anchorFiltros.forEach(elem => elem.classList.remove('selected'));
    evento.target.classList.add('selected');

    for (const elemento of divTodoList.children) {
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');
        switch (filtro) {
            case 'pendientes':
                if (completado) {
                    elemento.classList.add('hidden');
                }
                break;
            case 'completados':
                if (!completado) {
                    elemento.classList.add('hidden');
                }
                break;
        }
    }
});