import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

router
    .route('/register')
    .post(userController.registerUser)

router
    .route('/update')
    .post(userController.updateUser)

router
    .route('/getscore')
    .get(userController.getScore)


export default router;
