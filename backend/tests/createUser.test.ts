import request from 'supertest';
import app from '../src/app/app'; // Assuming app.ts initializes Express
import { user } from '../src/models/user';


const passwordTest:string = "password"
let userTest:user = new user("User","Amine",passwordTest,"amine@gmail.com")
let token:string = ""

describe('User Controller', () => {


    it('POST /login should not log the user', async () => {
        const response = await request(app).post('/auth/login')
        .send({
            username: userTest.getName(),
            password: passwordTest,
        });
        expect(response.status).toBe(401);
      });

    it('POST /register should create a user', async () => {
    const response = await request(app).post('/auth/register')
    .send({
        role:userTest.getRole(),
        username: userTest.getName(),
        password: passwordTest,
        mail: userTest.getMail()
    });
    expect(response.status).toBe(201);
    userTest.setId(response.body.id);
  });

  it('POST /login should log the user', async () => {
    const response = await request(app).post('/auth/login')
    .send({
        username: userTest.getName(),
        password: passwordTest,
    });
    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();

    token = response.body.token
  });



   it('POST /updateMail should not update the user mail', async () => {
    const response = await request(app).post('/user/updateMail/'+userTest.getId())
    .send({
        newMail:"nouveaumail@gmail.com",
    });
    expect(response.status).toBe(401);
  });

   it('POST /updateMail should update the user mail', async () => {
    const response = await request(app).post('/user/updateMail/'+userTest.getId())
    .set('Authorization', `Bearer ${token}`)
    .send({
        newMail:"nouveaumail@gmail.com",
    });
    expect(response.status).toBe(201);
  });

  it('POST /updatePassword should update the user password', async () => {
    const response = await request(app).post('/user/updatePassword/'+userTest.getId())
    .set('Authorization', `Bearer ${token}`)
    .send({
        newPassword:"test123",
    });
    expect(response.status).toBe(201);
  });
   
  });