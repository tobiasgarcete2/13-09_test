import { database } from "../db/database.js";

export const getAllTodosCtrl = (req, res) => {
  const userId = req.user.id;
  
  const userTodos = database.todos.filter((todo) => todo.owner === userId);

  res.json({ todos: userTodos });
};
