import request from 'supertest';
import app from '../src/app/app';
import { user } from '../src/services/user/classes/user';

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

 it('GET article/user/:id should return the articles of the user', async () => {
    const response = await request(app).get('/article/user/'+1)
    .set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200);
    expect(response.body.Articles).toBeDefined();
    console.log(response.body.Articles);
  });
  });