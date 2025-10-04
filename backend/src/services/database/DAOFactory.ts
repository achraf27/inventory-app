import type { userDao } from "../user/interfaces/userDao.js";

export abstract class DAOFactory{
    abstract createUserDAO():userDao
}