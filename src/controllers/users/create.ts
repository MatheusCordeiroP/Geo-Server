import { Request, Response } from 'express';
import * as Joi from 'joi';
import { validation } from '../../middlewares';
import { StatusCodes } from 'http-status-codes';

interface IBodyProps {
  name: string;
  email: string;
  address?: string;
  coordinates?: Array<number>;
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

export const createValidation = validation({ body: bodySchema });

export const create = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response
) => {
  const data: IBodyProps = req.body;

  return res.status(StatusCodes.NOT_IMPLEMENTED).send({});
};
