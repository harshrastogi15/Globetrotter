import {connect} from 'mongoose'
import { Logger } from './logger.js';
// const url=`mongodb://localhost:27017/bookStore?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false`;


const connectTodb = async(dotenv)=>{
    const url = process.env.URL_DB;
    try {
        Logger.log("Try to connect database")
        await connect(url);
        Logger.log("database connected")
    } catch (error) {
        console.log("error "+error);
    }
}

export default connectTodb
