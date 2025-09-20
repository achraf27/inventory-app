import { userDbDao } from "../../user/classes/userDbDao.js";
import type { userDao } from "../../user/interfaces/userDao.js";
import { DAOFactory } from "../DAOFactory.js";

export class DAODbFactory extends DAOFactory{
    createUserDAO(): userDao {
        return new userDbDao;
    }

}