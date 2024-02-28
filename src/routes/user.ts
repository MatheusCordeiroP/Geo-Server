import { Router } from 'express';
import { UsersController } from '../controllers/index';

const router = Router();

router.post(
  '/create',
  UsersController.createValidation,
  UsersController.create
);

router.get('/', UsersController.getAllValidation, UsersController.getAll);

router.get('/:id', UsersController.getByIdValidation, UsersController.getById);

router.delete(
  '/:id',
  UsersController.deleteByIdValidation,
  UsersController.deleteById
);

router.put(
  '/:id',
  UsersController.updateByIdValidation,
  UsersController.updateById
);

export default router;
