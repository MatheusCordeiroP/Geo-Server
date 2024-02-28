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

export const deleteByIdValidation = validation({ params: paramsSchema });

export const deleteById = async (req: Request<any>, res: Response) => {
  const data: IParamProps = req.params;

  const results = await Region.findByIdAndDelete(data.id);
  return res.status(StatusCodes.OK).send(results);
};
