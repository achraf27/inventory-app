import { article } from "../models/article.js";
import { articleDao } from "../dao/articleDao.js";
import type { ArticleRow } from "../types/articleRow.js";

export class articleRepository{
    private articleDao: articleDao = new articleDao();
    
    
    private mapTypeToObject(row:ArticleRow):article{
            return new article(row.name,row.quantity,row.unit,row.id);
        }
    
        private mapObjectToType(_article:article):Omit<ArticleRow,"id">{
            return {
                name: _article.getName(),
                quantity: _article.getQuantity(),
                unit: _article.getUnit(),
            }
        }
    
        public async getArticle(article_id:number):Promise<ArticleRow|undefined>{
            const row = await this.articleDao.findById(article_id);
            return row? this.mapTypeToObject(row) : undefined;
        }
    
        public async getAllArticles(id:number):Promise<article[] | undefined>{
            const rows = await this.articleDao.findByUserId(id);
            return  rows?.map(row => new article(
            row.name,
            row.quantity,
            row.unit,
            row.id,
        ));
        }
    
        public async createArticle(_article:article):Promise<article>{
    
            const row = this.mapObjectToType(_article)
            const id = await this.articleDao.insert(row);
            _article.setId(id);
            return _article;
        }
    
        public async deleteArticle(id:number): Promise<boolean>{
            const changes = await this.articleDao.delete(id);
            return changes > 0;
        }
    

        public async updateArticle(id:number,_article:Partial<ArticleRow>):Promise<boolean>{
            let totalChanges = 0;

            if(_article.name !== undefined) totalChanges += await this.articleDao.updateName(id,_article.name);

            if(_article.quantity !== undefined) totalChanges += await this.articleDao.updateQuantity(id,_article.quantity);

            if(_article.unit !== undefined) totalChanges += await this.articleDao.updateUnit(id,_article.unit);

            return totalChanges > 0;
        }
    
    
}
