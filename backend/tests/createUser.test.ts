import request from 'supertest';
import app from '../src/app'; // Assuming app.ts initializes Express
import { user } from '../src/services/user/classes/user';


const passwordTest = "password"
let userTest = new user("Achraf",passwordTest,"achraf@gmail.com",)


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
  });

  it('POST /user should delete the user', async () => {
    const response = await request(app).delete('/user/delete')
    .send({
        username: userTest.getId(),
    });
    expect(response.status).toBe(200);
  });


    


   
  });