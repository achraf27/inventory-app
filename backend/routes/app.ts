import express from 'express';
import { DAODbFactory } from '../services/database/classes/DAODbFactory.js';
import { user } from '../services/user/classes/user.js';

const app = express();
const factory = new DAODbFactory;
const userDb = factory.createUserDAO();



app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello Express!');
});

app.post('/auth', (req, res) => {
  const { username, password } = req.body;
  console.log("Login attempt:", username, password);

  if (username === "test" && password === "123") {
    return res.status(201).json({ message: "Login successful", user: { username } });
  } else {
    return res.status(401).json({ error: "Invalid credentials" });
  }
});

app.post('/create', (req, res) => {
  const { name, password, mail } = req.body;
  try{
  userDb.insert(new user(name,password,mail))
  return res.status(201).json({message : "Account created"})
  }
  catch(e){
    console.log(e);
  }
  
});


export default app;