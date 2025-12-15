import request from 'supertest';
import app from '../src/app/app';

let ArticleTemp = {
    article_id:1
}

let UserTemp = {
  id:1,
  role:"Admin",
  name:"Achraf",
  mail:"achraf@gmail.com",
  password:"password"
}

let token:string = ""

beforeAll(async () => {
  const loginRes = await request(app).post('/auth/login').send({
    name: UserTemp.name,
    password: UserTemp.password
  });
  token = loginRes.body.token;
});

describe('Inventory Controller', () => {
    it('POST /inventory/add/:user_id/:article_id should add an article to the user`s inventory', async () => {
        const response = await request(app).post('/inventory/add/'+UserTemp.id+'/'+ArticleTemp.article_id)
        .set('Authorization', `Bearer ${token}`)
        .send({
            quantity:"5"
        });
        expect(response.status).toBe(200);
      });

  });