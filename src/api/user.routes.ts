
import { Router } from 'express';
import * as userController from '../controllers/user.controller';
import { isAuthenticated } from '../middlewares/auth.middleware';

const router = Router();

router.use(isAuthenticated);

router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.patch('/:id/photo', userController.updateUserPhoto);

export default router;
