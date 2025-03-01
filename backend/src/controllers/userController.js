import userService from '../services/userService.js';
import { AppError } from '../utils/errorHandler.js';
import { Logger } from '../utils/logger.js';
import {Types} from 'mongoose';

class UserController {
    static async registerUser(req,res,next){
        try {
           const {username, score} = req.body
           if(!username || !score){
            new AppError("Invalid data",400)
           }
           const response = await userService.registerUser(username, score);

           return res.json({response:response, message: "user created successfully"});
        } catch (error) {
            next(error)
        }
    }

    static async updateUser(req,res,next){
        try {
            const {username, score, password} = req.body
            const response = await userService.updateUser(username, score, password);

            return res.json({response:response, message: "user updated successfully"});
         } catch (error) {
             next(error)
         }
    }

    static async getScore(req,res,next){
        try {
            const { username } = req.query;
            if(!username){
                throw new AppError("please provide username",400);
            }
            const response = await userService.getScore(username);
            return res.json({response: response, message: "scored fetched successfully"});
        } catch (error) {
            next(error)
        }
    }
}

export default UserController
