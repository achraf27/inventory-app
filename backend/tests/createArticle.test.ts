import request from 'supertest';
import app from '../src/app/app';
import { article } from '../src/models/article';
import { user } from '../src/models/user';

const userTest:user = new user("Admin","Achraf","test123","achraf@gmail.com")
let token:string = "";

describe('Article Controller', () => {
 it('POST /login should log the user', async () => {
    const response = await request(app).post('/auth/login')
    .send({
        username: userTest.getName(),
        password: "test123",
    });
    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();

    token = response.body.token
  });

  let Article:article = new article(userTest.getId(),"farine",8,"kg")

   it('POST /article should not create an article', async () => {
        const response = await request(app).post('/article')
        .send({
            name: Article.getName(),
            quantity: Article.getQuantity(),
            unit: Article.getUnit(),
            user_id: 1
            
        });
        expect(response.status).toBe(401);
        Article.setId(response.body.id);
      });

    it('POST /article should create an article', async () => {
        const response = await request(app).post('/article')
        .set('Authorization', `Bearer ${token}`)
        .send({
            name: Article.getName(),
            quantity: Article.getQuantity(),
            unit: Article.getUnit(),
            user_id: 1
            
        });
        expect(response.status).toBe(200);
        Article.setId(response.body.id);
      });


      it('POST /updateArticle should update the article name', async () => {
        const response = await request(app).patch('/article/updateArticle/'+1)
        .set('Authorization', `Bearer ${token}`)
        .send({

            name: "Amande",
            quantity: "",
            unit: ""
        });
        expect(response.status).toBe(200);
      });


  });