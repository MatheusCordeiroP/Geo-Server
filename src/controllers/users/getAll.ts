import { Request, Response } from 'express';
import * as Joi from 'joi';
import { validation } from '../../middlewares';
import { StatusCodes } from 'http-status-codes';
import { ParsedQs } from 'qs';
import Region from '../../models/regions';

interface IQueryProps {
  limit: number;
  offset: number;
}

const querySchema: Joi.Schema<IQueryProps> = Joi.object().keys({
  limit: Joi.number().min(1).max(100).optional(),
  offset: Joi.number().min(0).optional(),
});

export const getAllValidation = validation({ query: querySchema });

export const getAll = async (
  req: Request<{}, {}, {}, ParsedQs>,
  res: Response
) => {
  const data: IQueryProps = req.query as any;
};
