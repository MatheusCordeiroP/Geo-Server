import { Request, Response } from 'express';
import * as Joi from 'joi';
import { validation } from '../../middlewares';
import { StatusCodes } from 'http-status-codes';

interface IBodyProps {
  name?: string;
  email?: string;
  address?: string;
  coordinates?: Array<number>;
}
interface IParamProps {
  id: string;
}

const bodySchema: Joi.Schema<IBodyProps> = Joi.object()
  .keys({
    name: Joi.string().required().min(2).invalid(''),
    email: Joi.string().required().email(),
    address: Joi.alternatives().conditional('coordinates', {
      is: Joi.exist(),
      then: Joi.forbidden(),
      otherwise: Joi.string().required().min(3).invalid(''),
    }),
    coordinates: Joi.alternatives().conditional('address', {
      is: Joi.exist(),
      then: Joi.forbidden(),
      otherwise: Joi.array().items(Joi.number().required()).required(),
    }),
  })
  .xor('address', 'coordinates');

const paramsSchema: Joi.Schema<IParamProps> = Joi.object().keys({
  id: Joi.string().invalid('').required(),
});

export const updateByIdValidation = validation({
  body: bodySchema,
  params: paramsSchema,
});

export const updateById = async (req: Request<any>, res: Response) => {
  const data: IParamProps = req.params;
  return res.status(StatusCodes.NOT_IMPLEMENTED).send('Not implemented.');
};
