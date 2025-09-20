
import app from "../routes/app.js";
import * as dotenv from "dotenv";
import { Db } from '../services/database/classes/dbSqlite.js';

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;







app.listen(PORT, async () => {
    console.log(`Server running on http://localhost:${PORT}`);
    try{
      await Db.createTables();
      console.log("Base SQLite initialisée !");
      }
      catch(e){
        console.log(e);
      }
  });