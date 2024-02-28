import { Request, Response } from 'express';
import * as Joi from 'joi';
import { validation } from '../../middlewares';
import { StatusCodes } from 'http-status-codes';
import User from '../../models/users';

interface IBodyProps {
  name?: string;
  email?: string;
  address?: string;
  coordinates?: Array<number>;
}
interface IParamProps {
  id: string;
}

const bodySchema: Joi.Schema<IBodyProps> = Joi.object().keys({
  name: Joi.string().optional().min(2).invalid(''),
  email: Joi.string().optional().email(),
  address: Joi.alternatives()
    .conditional('coordinates', {
      is: Joi.exist(),
      then: Joi.forbidden(),
      otherwise: Joi.string().optional().min(3).invalid(''),
    })
    .optional(),
  coordinates: Joi.alternatives()
    .conditional('address', {
      is: Joi.exist(),
      then: Joi.forbidden(),
      otherwise: Joi.array().items(Joi.number().required()).optional(),
    })
    .optional(),
});

const paramsSchema: Joi.Schema<IParamProps> = Joi.object().keys({
  id: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
});

export const updateByIdValidation = validation({
  body: bodySchema,
  params: paramsSchema,
});

export const updateById = async (req: Request<any>, res: Response) => {
  try {
    const params: IParamProps = req.params;
    const data: IBodyProps = req.body;

    const results = await User.findByIdAndUpdate(params.id, data);
    return res.status(StatusCodes.OK).send(results);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
};
