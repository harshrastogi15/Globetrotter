import { AppError } from '../utils/errorHandler.js';
import { Logger } from '../utils/logger.js';
import { User } from '../models/UserModel.js'

class UserService {
    static async registerUser(username, score) {
        try {

            const newUser = new User({
                username: username,
                score: { correct: score.correct, incorrect: score.incorrect },
            });

            const savedUser = await newUser.save();
            Logger.log(`${username} registered successfully`)
            return { username: savedUser.username, score: savedUser.score }

        } catch (error) {
            if (error.code === 11000) {
                throw new AppError("User already exist", 400);
            } else {
                throw error;
            }
        }
    }

    static async updateUser(username, score, password) {
        try {
            const user = await User.findOne({ username });
            if (user) {
                const passwordMatch = await user.comparePassword(password);
                if (passwordMatch) {
                    Logger.log(`${username} logged successfully`)
                    const updatedUser = await User.findOneAndUpdate(
                        { username: username },
                        { $inc: { 'score.correct': score.correct, 'score.incorrect': score.incorrect } },
                        { new: true, runValidators: true }
                    );
                    return {username: updatedUser.username, score: updatedUser.score};
                } else {
                    throw new AppError("User or password not found", 400);
                }
            } else {
                throw new AppError("User or password not found", 400);
            }
        } catch (error) {
            throw error;
        }
    }

    static async getScore(username){
        try {
            const user = await User.findOne({ username: username });
            if(user){
                return {username: user.username, score: user.score};
            }else{
                throw new AppError("Invalid username",400);
            }
        } catch (error) {
            throw error;
        }
    }

}

export default UserService
