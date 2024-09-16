export const todosPage = () => {
  const container = document.createElement("div");

  container.classList.add(
    "flex",
    "flex-col",
    "items-center",
    "justify-center",
    "h-screen",
    "bg-gray-600"
  );
  
  const title = document.createElement("h1");

  title.classList.add("text-3xl", "font-bold", "mb-4", "text-white");
  title.textContent = "Lista de Tareas";

  const table = document.createElement("table");

  table.classList.add(
    "w-1/2",
    "bg-white",
    "h-[700px]",
    "overflow-y-auto",
    "rounded-lg"      
  );

  const thead = document.createElement("thead");
  const tr = document.createElement("tr");
  const th1 = document.createElement("th");
  th1.classList.add("px-4", "py-2");
  th1.textContent = "ID";

  const th2 = document.createElement("th");
  th2.classList.add("border", "px-4", "py-2");
  th2.textContent = "Title";

  const th3 = document.createElement("th");
  th3.classList.add("border", "px-4", "py-2");
  th3.textContent = "Completed";

  const th4 = document.createElement("th");
  th4.classList.add("border", "px-4", "py-2");
  th4.textContent = "Owner Id";

  tr.appendChild(th1);
  tr.appendChild(th2);
  tr.appendChild(th3);
  tr.appendChild(th4);

  thead.appendChild(tr);

  const tbody = document.createElement("tbody");

  tbody.classList.add("text-center");
  table.appendChild(thead);
  table.appendChild(tbody);

  
  fetch("http://localhost:4000/todos", {
    credentials: 'include'
  })
    .then(response => response.json())
    .then(data => {
      data.todos.forEach(todo => {
        if (todo.id === 0) return;

        const tr = document.createElement("tr");

        const td1 = document.createElement("td");
        td1.classList.add("border", "px-4", "py-2");
        td1.textContent = todo.id;

        const td2 = document.createElement("td");
        td2.classList.add("border", "px-4", "py-2");
        td2.textContent = todo.title;

        const td3 = document.createElement("td");
        td3.classList.add("border", "px-4", "py-2");
        td3.textContent = todo.completed ? "Sí" : "No";

        const td4 = document.createElement("td");
        td4.classList.add("border", "px-4", "py-2");
        td4.textContent = todo.owner;

        const td5 = document.createElement("td");
        td5.classList.add("border", "px-4", "py-2");

        const btnDelete = document.createElement("button");
        const btnModify = document.createElement("button");

        btnDelete.classList.add(
          "bg-red-500",
          "text-white",
          "p-2",
          "rounded",
          "hover:bg-red-600",
          "mb-4",
          "m-3"
        );

        btnModify.classList.add(
          "bg-green-500",
          "text-white",
          "p-2",
          "rounded",
          "hover:bg-green-600",
          "mb-4"
        );

        btnDelete.textContent = "Eliminar";
        btnModify.textContent = "Editar";

        btnDelete.addEventListener("click", () => {
          fetch(`http://localhost:4000/todos/${todo.id}`, {
            method: 'DELETE',
            credentials: 'include'
          }).then(() => {
            window.alert(`La tarea ${todo.id} se a eliminado correctamente`)
            tr.remove();
          });
        });

        btnModify.addEventListener("click", () => {
          const newTitle = prompt("Ingrese el nuevo título:", todo.title);
          const newCompleted = confirm("¿Está completada la tarea?");

          if (newTitle !== null) {
            fetch(`http://localhost:4000/todos/${todo.id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                title: newTitle,
                completed: newCompleted
              }),
              credentials: 'include'
            }).then(response => response.json())
              .then(updatedTodo => {
                td2.textContent = updatedTodo.todo.title;
                td3.textContent = updatedTodo.todo.completed ? "Sí" : "No";
                window.alert(`La tarea ${todo.id} se modificó correcamente`)
              });
          }
        });

      
        

        td5.appendChild(btnDelete);
        td5.appendChild(btnModify);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tbody.appendChild(tr);
      });
    });

  container.appendChild(title);
  container.appendChild(table);

  return container;
};