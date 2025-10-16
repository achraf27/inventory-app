import request from 'supertest';
import app from '../src/app'; // Assuming app.ts initializes Express
import { article } from '../src/services/articles/classes/article';

let Article:article = new article("farine",8)
let token:string = ""

describe('Article Controller', () => {


    it('POST /article should create an article', async () => {
        const response = await request(app).post('/article')
        .send({
            name: Article.getName(),
            quantity: Article.getQuantity(),
        });
        expect(response.status).toBe(200);
        Article.setId(response.body.id);
      });

      it('Delete /article should delete an article', async () => {
        const response = await request(app).delete('/article'+"/"+Article.getId())
        expect(response.status).toBe(200);
      });

  });