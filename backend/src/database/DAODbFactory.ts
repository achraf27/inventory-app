import { articleDbDao } from "../../articles/classes/articleDbDao.js";
import type { articleRepository } from "../repositories/articleRepository.js";
import { userDao } from "../dao/userDao.js";
import type { userRepository } from "../repositories/userRepository.js";
import { DAOFactory } from "./DAOFactory.js";

export class DAODbFactory extends DAOFactory{
    createUserDAO(): userDao {
        return new userDao;
    }

    createArticleDAO(): articleDao {
        return new articleDbDao;
    }

}