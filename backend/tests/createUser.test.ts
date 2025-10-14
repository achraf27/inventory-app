import request from 'supertest';
import app from '../src/app'; // Assuming app.ts initializes Express
import { user } from '../src/services/user/classes/user';


const passwordTest:string = "password"
let userTest:user = new user("Achraf",passwordTest,"achraf@gmail.com",)
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


   it('POST /modifyMail should update the user mail', async () => {
    const response = await request(app).post('/user/modifyMail')
    .set('Authorization', `Bearer ${token}`)
    .send({
        id: userTest.getId(),
        newMail:"nouveaumail@gmail.com",
    });
    expect(response.status).toBe(201);
  });

  it('POST /modifyPassword should update the user password', async () => {
    const response = await request(app).post('/user/modifyPassword')
    .set('Authorization', `Bearer ${token}`)
    .send({
        id: userTest.getId(),
        newPassword:"test123",
    });
    expect(response.status).toBe(201);
  });



  it('POST /user should delete the user', async () => {
    const response = await request(app).delete('/user/delete')
    .set('Authorization', `Bearer ${token}`)
    .send({
        id: userTest.getId(),
    });
    expect(response.status).toBe(200);
  });


    


   
  });