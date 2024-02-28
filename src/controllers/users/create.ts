import { Request, Response } from 'express';
import * as Joi from 'joi';
import { validation } from '../../middlewares';
import { StatusCodes } from 'http-status-codes';
import User from '../../models/users';

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
  let data: IBodyProps = req.body;

  try {
    if (data.address) {
      data.coordinates = getCoordinatesWithAddress();
    }
    if (data.coordinates) {
      data.address = getAddressWithCoordinates();
    }

    const user = new User({
      name: data.name,
      email: data.email,
      address: data.address,
      coordinates: data.coordinates,
    });
    user.save();

    return res.status(StatusCodes.CREATED).send(user);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

const getCoordinatesWithAddress = () => {
  return [5.2, 0.0];
};

const getAddressWithCoordinates = () => {
  return 'mocked address';
};
