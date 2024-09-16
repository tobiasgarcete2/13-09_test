import { database } from "../db/database.js";

export const getAllTodosCtrl = (req, res) => {
  const userId = req.user.id; // Usuario autenticado

  // Filtrar las tareas del usuario
  const userTodos = database.todos.filter((todo) => todo.owner === userId);
  res.json({ todos: userTodos });
};


export const deleteTodoCtrl = (req, res) => {
  const userId = req.user.id; // Usuario autenticado
  const { id } = req.params; // ID de la tarea que se va a eliminar

  // Buscar la tarea en el array
  const todoIndex = database.todos.findIndex((todo) => todo.id === parseInt(id) && todo.owner === userId);

  // Verificar si la tarea existe y pertenece al usuario
  if (todoIndex === -1) {
    return res.status(404).json({ message: "Tarea no encontrada o no pertenece al usuario." });
  }

  // Eliminar la tarea
  database.todos.splice(todoIndex, 1);

  res.status(200).json({ message: "Tarea eliminada correctamente" });
};

export const updateTodoCtrl = (req, res) => {
  const userId = req.user.id; // Usuario autenticado
  const { id } = req.params; // ID de la tarea que se va a modificar
  const { title, completed } = req.body; // Nuevos datos para la tarea

  // Buscar la tarea en el array
  const todoIndex = database.todos.findIndex((todo) => todo.id === parseInt(id) && todo.owner === userId);

  // Verificar si la tarea existe y pertenece al usuario
  if (todoIndex === -1) {
    return res.status(404).json({ message: "Tarea no encontrada o no pertenece al usuario." });
  }

  // Actualizar los datos de la tarea
  database.todos[todoIndex] = {
    ...database.todos[todoIndex],
    title: title || database.todos[todoIndex].title, // Si no se proporciona un nuevo título, mantener el existente
    completed: completed !== undefined ? completed : database.todos[todoIndex].completed, // Mantener el estado anterior si no se proporciona
  };

  res.status(200).json({ message: "Tarea actualizada correctamente", todo: database.todos[todoIndex] });
};

export const addTodoCtrl = (req, res) => {
  const userId = req.user.id; // Usuario autenticado
  const { title, completed } = req.body; // Datos para la nueva tarea

  // Validar que se proporcione un título para la tarea
  if (!title) {
    return res.status(400).json({ message: "El título de la tarea es requerido." });
  }

  // Crear un nuevo ID único (este ejemplo usa un contador simple; en producción, usar una mejor solución como UUID)
  const newId = database.todos.length > 0 ? Math.max(...database.todos.map(todo => todo.id)) + 1 : 1;

  // Crear la nueva tarea
  const newTodo = {
    id: newId,
    title,
    completed: completed || false, // Por defecto, la tarea no está completada
    owner: userId, // Asignar el usuario autenticado como propietario
  };

  // Agregar la nueva tarea al array
  database.todos.push(newTodo);

  res.status(201).json({ message: "Tarea agregada correctamente", todo: newTodo });
};
