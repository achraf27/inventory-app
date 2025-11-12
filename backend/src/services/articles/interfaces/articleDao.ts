import { article } from "../classes/article.js";

export interface articleDao{
    insert(Aser:article,user_id:string):Promise<void>;
    delete(id:number):Promise<void>;
    findByUserId(user_id:number):Promise<article []>;
    findById(id:number):Promise<article|undefined>;

    updateArticle(id_article:number, name:string, quantity:number,unit:string):Promise<number>;

    updateName(id:string, name:string, user_id:string):Promise<number>;
    updateQuantity(id:string, quantity:number,user_id:string):Promise<number>
    updateUnit(id:string, quantity:number,user_id:string):Promise<number>
}