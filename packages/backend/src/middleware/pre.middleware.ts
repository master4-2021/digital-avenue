import bodyParser from 'body-parser';
import cors from 'cors';
import { Middleware } from '../types/middleware';

export const preMiddleware = (
  bodyParserOptions?: bodyParser.OptionsJson
): Middleware[] => {
  const middlewares: Middleware[] = [];
  middlewares.push(bodyParser.json(bodyParserOptions));
  middlewares.push(bodyParser.urlencoded({ extended: true }));
  middlewares.push(cors())

  return middlewares;
};
