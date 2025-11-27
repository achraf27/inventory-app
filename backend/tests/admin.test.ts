import request from 'supertest';
import app from '../src/app/app';
import { article } from '../src/services/articles/classes/article';
import { user } from '../src/services/user/classes/user';

let Article:article = new article("farine",8,"kg")
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


 it('POST /:id should let the admin access the route', async () => {
    const response = await request(app).post('/user/'+1)
    .send({
        username: userTest.getName(),
        password: "test123",
    });
    expect(response.status).toBe(200);


  });


  });