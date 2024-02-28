import { Router } from 'express';
import { RegionsController } from '../controllers/index';

const router = Router();

router.post(
  '/create',
  RegionsController.createValidation,
  RegionsController.create
);

router.get('/', RegionsController.getAllValidation, RegionsController.getAll);

router.get(
  '/:id',
  RegionsController.getByIdValidation,
  RegionsController.getById
);

router.delete(
  '/:id',
  RegionsController.deleteByIdValidation,
  RegionsController.deleteById
);

router.put(
  '/:id',
  RegionsController.updateByIdValidation,
  RegionsController.updateById
);

export default router;
