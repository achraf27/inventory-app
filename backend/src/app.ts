import express from 'express';
import authRoutes from './routes/auth.js'
import userRoutes from './routes/user.js'


const app = express();




app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello Express!');
});



app.use('/auth', authRoutes);
app.use('/user',userRoutes);


'{"name":"Achraf","password":"password","mail":"mail@mail.com"}'


export default app;