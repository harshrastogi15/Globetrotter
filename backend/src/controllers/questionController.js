import QuestionService from '../services/questionService.js';
import { AppError } from '../utils/errorHandler.js';
import { Logger } from '../utils/logger.js';
import {Types} from 'mongoose';

class QuestionController {
    static async getQuestion(req,res,next){
        try {
            let noOfClue = req.query.clue? req.query.clue: 3;

            if(noOfClue<1 || noOfClue>5){
                throw new AppError("Clues should be in between 1 to 5",400)
            }
            const question = await QuestionService.getQuestion(noOfClue);
            return res.status(200).json({question: question, message: "question generated successfully"})
        } catch (error) {
            next(error)
        }
    }

    static async checkAnswer(req,res,next){
        try {
            const {questionId, answer} = req.body;
            if(!questionId || !answer || !Types.ObjectId.isValid(questionId)) {
                throw new AppError("Invalid data",400)
            }
            const response = await QuestionService.checkAnswer(questionId,answer);

            return res.status(200).json({response: response, message: "answer checked successfully"})
        } catch (error) {
            next(error)
        }
    }
}

export default QuestionController;
