import { Request, Response, RequestParamHandler } from 'express';
import * as Joi from 'joi';
import { validation } from '../../middlewares';
import { StatusCodes } from 'http-status-codes';

interface IParamProps {
  id: string;
}

const paramsSchema: Joi.Schema<IParamProps> = Joi.object().keys({
  id: Joi.string().invalid('').required(),
});

export const getByIdValidation = validation({ params: paramsSchema });

export const getById = async (req: Request<any>, res: Response) => {
  const data: IParamProps = req.params;

  return res.status(StatusCodes.NOT_IMPLEMENTED).send('Not implemented.');
};
