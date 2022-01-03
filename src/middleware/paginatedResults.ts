import { Request, Response, NextFunction } from 'express';
import { Model } from 'mongoose';

export interface PaginatedResponse extends Response {
  paginatedResults?: any;
}

export function paginatedResults<T>(model: Model<T>) {
  return async (req: Request, res: PaginatedResponse, next: NextFunction) => {
    const page: number = parseInt(req.query.page as string);
    const limit: number = parseInt(req.query.limit as string);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results: any = {};

    if (endIndex < (await model.countDocuments().exec())) {
      results.next = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      results.prev = {
        page: page - 1,
        limit,
      };
    }

    try {
      results.results = await model.find().limit(limit).skip(startIndex).exec();
      res.paginatedResults = results;
      next();
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  };
}
