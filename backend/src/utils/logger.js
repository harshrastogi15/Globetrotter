import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logStream = fs.createWriteStream(path.join(__dirname, '../../activity.log'), { flags: 'a' });

export class Logger {
  static log(message) {
    message = JSON.stringify(message).replace('\n',' ');
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}`;
    console.log(logMessage);
    logStream.write(logMessage+"\n");
  }
}
