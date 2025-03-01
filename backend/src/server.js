import express from 'express';
import { errorMiddleware } from './middleware/errorMiddleware.js';
import dotenv from 'dotenv';
import requestLogger from './middleware/loggerMiddleware.js';
import cors from 'cors'
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import connect from './utils/db.js';
import questionRoutes from './routes/questionRoute.js'
import userRoutes from './routes/userRoute.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: './config/.env' });


const app = express();


connect(dotenv);
app.use(cors())
app.use(express.static(__dirname+'/'));
app.use(express.json());

const PORT = process.env.PORT;

app.use(requestLogger);

// routes for application
app.use(`/api/v1/user/`, userRoutes);
app.use(`/api/v1/`, questionRoutes);

app.use(errorMiddleware);


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


export default app
