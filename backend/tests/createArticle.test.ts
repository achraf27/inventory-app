import request from 'supertest';
import app from '../src/app'; // Assuming app.ts initializes Express
import { article } from '../src/services/articles/classes/article';
import { user } from '../src/services/user/classes/user';

let Article:article = new article("farine",8)
const userTest:user = new user("Achraf","password","achraf@gmail.com")
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



    it('POST /article should create an article', async () => {
        const response = await request(app).post('/article')
        .set('Authorization', `Bearer ${token}`)
        .send({
            name: Article.getName(),
            quantity: Article.getQuantity(),
        });
        expect(response.status).toBe(200);
        Article.setId(response.body.id);
      });


      it('POST /updateQuantity should update the article name', async () => {
        const response = await request(app).post('/article/updateName/'+Article.getId())
        .set('Authorization', `Bearer ${token}`)
        .send({

            name: "Ble",
        });
        expect(response.status).toBe(200);
      });


       it('POST /updateQuantity should update the article quantity', async () => {
        const response = await request(app).post('/article/updateQuantity/'+Article.getId())
        .set('Authorization', `Bearer ${token}`)
        .send({
            quantity:2
        });
        expect(response.status).toBe(200);
      });
  });