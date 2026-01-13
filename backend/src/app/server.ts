
import app from "./app.js";
import { DbPostgreSQL } from "../database/dbPostgreSql.js";

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;


app.listen(PORT, async () => {
    console.log(`Server running on http://localhost:${PORT}`);
    
    try{
      await DbPostgreSQL.createTables()
      console.log("Base de donénes initialisée");
      }
      catch(e){
        console.log(e);
      }
  });