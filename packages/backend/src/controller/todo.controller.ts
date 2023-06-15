import { NextFunction, Request, Response } from 'express';
import fs from 'fs';

export class TodoController {
  public static getTodoList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const currentWeek = req.params.id;

      const rawData = fs.readFileSync(
        `${__dirname}/../../mock/datasource.json`,
        {
          encoding: 'utf-8',
        }
      );
      const data = JSON.parse(rawData);

      if (!data) {
        res.status(500).json({
          message: 'Internal Server Error',
          data: {},
        });
        return;
      }

      // if (!data[currentWeek]) {
      //   res.status(404).json({
      //     message: 'Not found',
      //     data: {},
      //   });
      //   return;
      // }

      res.status(200).json({
        message: 'Success',
        results: {
          ...data[currentWeek],
        },
      });
    } catch (err) {
      next(err);
    }
  };

  public static postTodoList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const currentWeek = req.params.id;

      const rawData = fs.readFileSync(
        `${__dirname}/../../mock/datasource.json`,
        {
          encoding: 'utf-8',
        }
      );
      const data = JSON.parse(rawData);

      data[currentWeek] = req.body;

      const payload = Buffer.from(JSON.stringify(data));
      fs.writeFileSync(`${__dirname}/../../mock/datasource.json`, payload, {
        encoding: 'utf-8',
      });

      res.status(200).json({
        message: 'Success',
        results: {},
      });
    } catch (err) {
      next(err);
    }
  };
}
