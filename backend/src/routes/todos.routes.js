import { Router } from "express";
import { addTodoCtrl, deleteTodoCtrl, getAllTodosCtrl, updateTodoCtrl } from "../controllers/todos.controllers.js";
import validarJwt from "../middlewares/validar-jwt.js";

const todosRouter = Router();

todosRouter.get("/",validarJwt, getAllTodosCtrl);

todosRouter.put("/:id",validarJwt, updateTodoCtrl);

todosRouter.delete("/:id",validarJwt, deleteTodoCtrl)

todosRouter.post("/agregar",validarJwt, addTodoCtrl)

export { todosRouter };