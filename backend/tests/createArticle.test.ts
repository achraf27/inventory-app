import request from 'supertest';
import app from '../src/app/app';

let ArticleTemp = {
  id:-1,
  name:"farine",
  unit:"kg"
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

describe('ArticleTemp Controller', () => {
   it('POST /Article  should not create an Article', async () => {
        const response = await request(app).post('/Article')
        .send({
            name: ArticleTemp.name,
            unit: ArticleTemp.unit,
        });
        expect(response.status).toBe(401);
      });

    it('POST /ArticleTemp should create an ArticleTemp', async () => {
        const response = await request(app).post('/Article')
        .set('Authorization', `Bearer ${token}`)
        .send({
            name: ArticleTemp.name,
            unit: ArticleTemp.unit,
            
        });
        expect(response.status).toBe(200);
        ArticleTemp.id = response.body.id;
      });

  });