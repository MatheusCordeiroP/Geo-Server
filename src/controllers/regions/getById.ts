import { Request, Response } from 'express';
import * as Joi from 'joi';
import { validation } from '../../middlewares';
import { StatusCodes } from 'http-status-codes';
import Region from '../../models/regions';

interface IParamProps {
  id: string;
}

const paramsSchema: Joi.Schema<IParamProps> = Joi.object().keys({
  id: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
});

export const getByIdValidation = validation({ params: paramsSchema });

export const getById = async (req: Request<any>, res: Response) => {
  const data: IParamProps = req.params;
  const result = await Region.findOne({ _id: data.id });

  return res.status(StatusCodes.OK).send(result);
};
