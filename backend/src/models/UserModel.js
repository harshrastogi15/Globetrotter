import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String},
  score: {
    correct: {
      type: Number, default: 0, min: 0, validate: {
        validator: Number.isInteger,
        message: '{VALUE} is not an integer value'
      }
    },
    incorrect: {
      type: Number, default: 0, min: 0, validate: {
        validator: Number.isInteger,
        message: '{VALUE} is not an integer value'
      }
    }
  }
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};



export const User = model('User', userSchema);
