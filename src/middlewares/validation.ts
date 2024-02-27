import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Schema } from 'joi';

type TProperty = 'body' | 'header' | 'params' | 'query';
type TAllSchemas = Record<TProperty, Schema>;
type TValidation = (schemas: Partial<TAllSchemas>) => RequestHandler;

// It is a generic validation that accepts schemas to validate body, header, params, and query.
export const validation: TValidation = schemas => async (req, res, next) => {
  try {
    let errors = {};
    for (let key in schemas) {
      const { error } = await schemas[key].validate(req[key], {
        abortEarly: false,
      });
      if (error) {
        errors[key] = error.details;
      }
    }

    if (Object.keys(errors).length > 0) {
      return res.status(StatusCodes.BAD_REQUEST).json(errors);
    }

    return next();
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ url: req.url, body: req.body, error });
  }
};
