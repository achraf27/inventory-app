import request from 'supertest';
import app from '../src/app/app'; // Assuming app.ts initializes Express

let UserTemp = {
  id:-1,
  role:"Admin",
  name:"Achraf",
  mail:"achraf@gmail.com",
  password:"password"
}

let token:string = ""

beforeAll(async () => {
  const res = await request(app).post('/auth/register').send({
    role: UserTemp.role,
    name: UserTemp.name,
    password: UserTemp.password,
    mail: UserTemp.mail
  });
  UserTemp.id = res.body.id;

  const loginRes = await request(app).post('/auth/login').send({
    name: UserTemp.name,
    password: UserTemp.password
  });
  token = loginRes.body.token;
});

describe('User Controller', () => {



   it('POST /updateMail should not update the User mail', async () => {
    const response = await request(app).post('/User/updateMail/'+UserTemp.id)
    .send({
        newMail:"nouveaumail@gmail.com",
    });
    expect(response.status).toBe(401);
  });

   it('POST /updateMail should update the User mail', async () => {
    const response = await request(app).post('/User/updateMail/'+UserTemp.id)
    .set('Authorization', `Bearer ${token}`)
    .send({
        newMail:"nouveaumail@gmail.com",
    });
    expect(response.status).toBe(200);
  });

  it('POST /updatePassword should update the User password', async () => {
    const response = await request(app).post('/User/updatePassword/'+UserTemp.id)
    .set('Authorization', `Bearer ${token}`)
    .send({
        newPassword:"test123",
    });
    expect(response.status).toBe(200);
  });
   
  });

  afterAll(async () => {
  await request(app)
    .delete('/User/' + UserTemp.id)
    .set('Authorization', `Bearer ${token}`);
});
