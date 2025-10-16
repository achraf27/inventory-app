import type { articleDao } from "../articles/interfaces/articleDao.js";
import type { userDao } from "../user/interfaces/userDao.js";

export abstract class DAOFactory{
    abstract createUserDAO():userDao
    abstract createArticleDAO():articleDao
}