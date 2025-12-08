import request from 'supertest';
import app from '../src/app/app';
import { user } from '../src/models/user';


const userTest:user = new user("User","Amine","test123","amine@gmail.com")
let token:string = "";




describe('Admin Controller', () => {

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

  it('POST /user/:id should not return a user', async () => {
    const response = await request(app).get('/user/'+2)
    .set('Authorization', `Bearer ${token}`)
    
    expect(response.status).toBe(403);

  });

   it('POST /user/:id should not delete a user', async () => {
    const response = await request(app).get('/user/delete'+1)
    .set('Authorization', `Bearer ${token}`)
    
    expect(response.status).toBe(403);

  });

  



  });