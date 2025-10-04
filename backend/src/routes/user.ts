import { Router } from 'express';
import { DAODbFactory } from '../services/database/classes/DAODbFactory.js';

const factory = new DAODbFactory;
const userDb = factory.createUserDAO();
const router = Router();

router.delete('/delete', async (req, res) => {
  const { id} = req.body;
  console.log("delete attempt:", id);

  try{
    const user = await userDb.findByUsername(id)
    if(user){
        userDb.delete(id)
        return res.status(200).json({ message: "account deleted successfuly", user: { id } });
    }
    else{
        return res.status(401).json({ error: "account not deleted" });
    }
  }catch(e){
    console.log(e)
    return res.status(500).json({ error: "server error"});
  }
});

export default router;
