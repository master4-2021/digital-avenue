import { Router } from 'express';
import { TodoController } from '../controller/todo.controller';

export const todoRouter = Router();

todoRouter.get('/todo/:id', TodoController.getTodoList);

todoRouter.post('/todo/:id', TodoController.postTodoList);

export default todoRouter;
