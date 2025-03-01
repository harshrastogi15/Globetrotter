import { Schema, model } from "mongoose";

const questionSchema = new Schema({
    clues: [{ type: String, required: true }],
    options: [{city:{ type: String, required: true },country:{ type: String, required: true }}],
    answer: {city:{ type: String, required: true },country:{ type: String, required: true }},
    fact: [{ type: String, required: true }],
});


export const Question = model('Question', questionSchema);
