import { cityList } from '../utils/cityList.js';
import { AppError } from '../utils/errorHandler.js';
import { Logger } from '../utils/logger.js';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs'
import { RandomIndex } from '../utils/randomIndexGenerator.js';
import { Question } from '../models/QuestionModel.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class QuestionService {
    static generateQuestion = async (noOfClue) => {
        try {
            let listofAllCity = await cityList.getList();
            const randomIndex = RandomIndex.getRandomIndex(10);
            const filePath = join(__dirname, '../../../questionData',`data${randomIndex}.json`);
            const data = fs.readFileSync(filePath, 'utf-8');
            const jsonData = JSON.parse(data);
            const lenData = jsonData.length;
            const randomQuestion = RandomIndex.getRandomIndex(lenData);

            const destination = jsonData[randomQuestion];
            const options = [{"city": destination.city,"country":destination.country}];
            while (options.length < 4) {
                let idx = RandomIndex.getRandomIndex(listofAllCity.length);
                const randomOption = listofAllCity[idx];
                if (!options.includes(randomOption)) options.push(randomOption);
            }

            options.sort(() => Math.random() - 0.5);

            let clue = destination.clues;
            clue.sort(() => Math.random() - 0.5);

            let funFact = destination.fun_fact
            let trivia = destination.trivia
            funFact.sort(() => Math.random() - 0.5);
            trivia.sort(() => Math.random() - 0.5);


            const question = {
                clues: clue.slice(0, noOfClue),
                options: options,
                answer: {"city": destination.city,"country":destination.country},
                fact: [funFact[0],trivia[0]]
            }

            // console.log(question)
            return question;

        } catch (error) {
            throw error
        }
    };

    static async getQuestion(noOfClue) {
        try {
            const question = await this.generateQuestion(noOfClue);
            const newquestion = new Question(question);
            const savedQuestion = await newquestion.save();
            return {
                questionId : savedQuestion._id,
                clues: savedQuestion.clues,
                options: question.options,
            };
        } catch (error) {
            throw error
        }
    }


    static async checkAnswer(questionId,answer){
        try {
            const question = await Question.findById(questionId);

            if(!question){
                throw new AppError("Invalid question Id",400)
            }

            const isCorrect = (question.answer.city === answer.city) && (question.answer.country === answer.country)
            const message = isCorrect? "Correct answer": "Incorrect answer";
            const deletedQuestion = await Question.findByIdAndDelete(questionId);
            return {result: isCorrect, message: message, answer: question.answer, fact: question.fact }
        } catch (error) {
            throw error;
        }
    }

}

export default QuestionService;
