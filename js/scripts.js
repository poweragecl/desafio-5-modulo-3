let tareas = [
    {
        id: 1,
        title: "Hacer mercado",
        status: ""
    },

    {
        id: 2,
        title: "Estudiar para la prueba",
        status: ""
    },

    {
        id: 3,
        title: "Sacar a pasear al perro",
        status: ""
    },
];


const input = document.querySelector('#addTodo');
const add = document.querySelector('#addButton');
const list = document.querySelector('.list');

let idCount = 3;


add.addEventListener('click', () => {
    const inputTitle = input.value;

    if(inputTitle){
     
        idCount++;
        tareas.push(
            {
                id: idCount,
                title: inputTitle,
                status: ""
            }
        );

        input.value = '';

        renderList();

    }else {
        alert("Rellena el campo de tarea");
    }

});

//funcion de para renderizar 

const renderList = () => {
    list.innerHTML = '';
    tareas.forEach((tarea) => {
        list.innerHTML += itemTemplate(tarea);
    });

    if(tareas.length === 0){
        list.innerHTML = emptyList();
    }

}

//template de item de lista
const itemTemplate = ({id, title, status}) => {

    return `
        <li class="list-item ${status === "checked" ? "done" : "" }">
            <div class="id col">
                ${id}
            </div>
            <div class="title col">
                ${title}
            </div>
            <div class="check col">
                <input type="checkbox" ${status}>
            </div>
            <div class="delete col">
                <button class="del"> <i class="fa-solid fa-trash"></i> </button>
            </div>
        </li>    
    `;

}

//Mensaje si borraste todas las tareas
const emptyList = () => {
    return `
        <li class="noTodos">
            <p>👻</br> No tienes tareas pendientes, comienza agregando una nueva tarea.</p>
        </li>
    `;
}

//Events clicks en la lista
list.addEventListener('click', e => {
        
    const listItem = e.target.closest('li').children[0].textContent;
    const index = Number(listItem);
    const elemento = tareas.findIndex(item => item.id === index); 

    //State Delete
    if(e.target.tagName === 'BUTTON'){
        tareas.splice(elemento, 1);
        renderList();
    }

    //State Done
    if(e.target.tagName === 'INPUT'){

        if(e.target.checked){  
            tareas[elemento].status = "checked";
        }else{
            tareas[elemento].status = "";
        }

        renderList();
    }
        
});

renderList();





