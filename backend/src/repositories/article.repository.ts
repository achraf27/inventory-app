import { Article } from "../models/article.js";
import { ArticleDao } from "../dao/article.dao.js";
import type { ArticleRow } from "../types/articleRow.js";

type CreateArticleInput = {
  name: string;
  unit: string;
};

export class ArticleRepository{
    private articleDao: ArticleDao;

    constructor(dao = new ArticleDao()) {
        this.articleDao = dao;
    }
    
    
    private mapRowToArticle(row:ArticleRow):Article{
            return new Article(row.name,row.unit,row.id);
        }
    
        public async getArticle(article_id:number):Promise<Article|undefined>{
            const row = await this.articleDao.findById(article_id);
            return row? this.mapRowToArticle(row) : undefined;
        }
    
    
        public async createArticle(_article:CreateArticleInput):Promise<Article>{
            const newArticle = new Article(_article.name,_article.unit);
            const id = await this.articleDao.insert(_article);
            newArticle.id = id;
            return newArticle;
        }
    
        public async deleteArticle(id:number): Promise<boolean>{
            const changes = await this.articleDao.delete(id);
            return changes > 0;
        }
    

        public async updateArticle(id:number,_article:Partial<ArticleRow>):Promise<boolean>{
            let totalChanges = 0;

            if(_article.name !== undefined) totalChanges += await this.articleDao.updateName(id,_article.name);

            if(_article.unit !== undefined) totalChanges += await this.articleDao.updateUnit(id,_article.unit);

            return totalChanges > 0;
        }
    
    
}
