import { Request, Response } from 'express';
import * as Joi from 'joi';
import { validation } from '../../middlewares';
import { StatusCodes } from 'http-status-codes';
import { GeoJSON } from 'geojson';

interface IBodyProps {
  region_id?: string;
  name?: string;
  region?: GeoJSON;
  created_by?: string;
}
interface IParamProps {
  id: string;
}

const bodySchema: Joi.Schema<IBodyProps> = Joi.object().keys({
  name: Joi.string().optional().min(2).invalid(''),
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
  }).optional(),
  created_by: Joi.string().optional(),
});
const paramsSchema: Joi.Schema<IParamProps> = Joi.object().keys({
  id: Joi.string().invalid('').required(),
});

export const updateByIdValidation = validation({
  body: bodySchema,
  params: paramsSchema,
});

export const updateById = async (req: Request<any>, res: Response) => {
  const id: IParamProps = req.params;
  const body: IBodyProps = req.body;
  return res.status(StatusCodes.NOT_IMPLEMENTED).send('Not implemented.');
};
