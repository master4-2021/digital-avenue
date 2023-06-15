import express from 'express';
import todoRouter from './router/todo.router';
import { preMiddleware } from './middleware/pre.middleware';
import { postMiddleware } from './middleware/post.middleware';

const app = express();

app.use(preMiddleware());

app.use('/api/v1/', todoRouter);

app.use(postMiddleware());

export default app;
