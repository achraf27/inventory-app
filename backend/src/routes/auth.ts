import { Router } from 'express';
import { user } from '../services/user/classes/user.js';
import { DAODbFactory } from '../services/database/classes/DAODbFactory.js';

const factory = new DAODbFactory;
const userDb = factory.createUserDAO();
const router = Router();


router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log("Login attempt:", username, password);

  try{
    const user = await userDb.findByUsername(username)
    if(user){
    return res.status(200).json({ message: "Login successful", user: { username } });
    }
    else{
        return res.status(401).json({ error: "Invalid credentials id : " });
    }
  }catch(e){
    console.log(e)
    return res.status(500).json({ error: "server error"});
  }
});

router.post('/register',(req,res)=>{
    const {username,password,mail} = req.body;
    console.log("creation attempt");
    try{
    userDb.insert(new user(username,password,mail))
    console.log("user created");
    return res.status(201).json({message: "user created"})
    }
    catch(e){
        console.log(e);
        return res.status(401).json({message: "user not created"})
    }



})


export default router;
