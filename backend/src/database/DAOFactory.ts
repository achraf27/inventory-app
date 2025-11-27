import type { articleDao } from "../articles/repository/articleDao.js";
import type { userDao } from "../../repositories/userRepository.js";

export abstract class DAOFactory{
    abstract createUserDAO():userDao
    abstract createArticleDAO():articleDao
}