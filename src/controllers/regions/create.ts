import { Request, Response } from 'express';
import * as Joi from 'joi';
import { validation } from '../../middlewares';
import { StatusCodes } from 'http-status-codes';
import { GeoJSON } from 'geojson';
import Region from '../../models/regions';

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
  created_by: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
});

export const createValidation = validation({ body: bodySchema });

export const create = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response
) => {
  const data: IBodyProps = req.body;

  try {
    const region = new Region({
      name: data.name,
      region: data.region,
      created_by: data.created_by,
    });
    region.save();
    return res.status(StatusCodes.CREATED).send(region);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
  }
};
