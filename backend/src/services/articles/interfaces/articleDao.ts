import { article } from "../classes/article.js";

export interface articleDao{
    insert(Aser:article):Promise<void>;
    delete(id:number):Promise<void>;
    findAll():Promise<article []>;
    findById(id:number):Promise<article|undefined>;
}