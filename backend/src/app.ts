import express from 'express';
import authRoutes from './routes/auth.js'
import userRoutes from './routes/user.js'
import articleRoutes from './routes/articles.js'
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.get('/', (req, res) => {res.send('Hello Express!');});
app.use('/auth', authRoutes);
app.use('/user',userRoutes);
app.use('/article',articleRoutes);


export default app;