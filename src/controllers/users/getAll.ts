import { Request, Response } from 'express';
import * as Joi from 'joi';
import { validation } from '../../middlewares';
import { StatusCodes } from 'http-status-codes';
import User from '../../models/users';

interface IQueryProps {
  limit: number;
  offset: number;
}

const querySchema: Joi.Schema<IQueryProps> = Joi.object().keys({
  limit: Joi.number().min(1).max(100).optional(),
  offset: Joi.number().min(0).optional(),
});

export const getAllValidation = validation({ query: querySchema });

export const getAll = async (req: Request<{}, {}, {}, any>, res: Response) => {
  const data: IQueryProps = req.query;
  const results = await User.find().skip(data.offset).limit(data.limit);

  // TODO: corrigir o count

  //   return res.json({
  //     rows: users,
  //     page,
  //     limit,
  //     total,
  //   });

  return res
    .status(StatusCodes.OK)
    .json({ users: results, count: results.length });
};
