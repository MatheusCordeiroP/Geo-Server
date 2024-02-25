import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as Joi from 'joi';

interface IRegion {
  name: string;
}

const schema: Joi.Schema<IRegion> = Joi.object().keys({
  name: Joi.string().required().min(2),
});

export const create = async (req: Request<{}, {}, IRegion>, res: Response) => {
  try {
    let data: IRegion | undefined = req.body;
    const { error } = await schema.validate(data, { abortEarly: false });
    if (error) {
      return res.status(StatusCodes.BAD_REQUEST).json(error.details);
    }

    return res.send('Create!');
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ url: req.url, body: req.body, error });
  }

  const data: IRegion = req.body;
};
