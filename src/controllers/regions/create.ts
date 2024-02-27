import { Request, Response } from 'express';
import * as Joi from 'joi';
import { validation } from '../../middlewares';
import { StatusCodes } from 'http-status-codes';
import { GeoJSON } from 'geojson';

interface IBodyProps {
  name: string;
  region: GeoJSON;
  created_by: string;
}

const bodySchema: Joi.Schema<IBodyProps> = Joi.object().keys({
  name: Joi.string().required().min(2).invalid(''),
  region: Joi.object({
    type: Joi.string()
      .valid(
        'Point',
        'Polygon',
        'LineString',
        'MultiPoint',
        'MultiPolygon',
        'MultiLineString'
      )
      .required(),
    coordinates: Joi.array()
      .items(
        Joi.array()
          .items(Joi.array().items(Joi.number().required()).required())
          .required()
      )
      .required(),
  }).required(),
  created_by: Joi.string().required(),
});

export const createValidation = validation({ body: bodySchema });

export const create = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response
) => {
  const data: IBodyProps = req.body;

  return res.status(StatusCodes.NOT_IMPLEMENTED).send(typeof data.region);
};
