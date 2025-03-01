import express from 'express';
import QuestionController from '../controllers/questionController.js';

const router = express.Router();

router
    .route('/question')
    .get(QuestionController.getQuestion)

router
    .route('/answer')
    .post(QuestionController.checkAnswer)


export default router;
