import request from 'supertest';
import { describe, it, expect, beforeAll,afterAll} from '@jest/globals';
import app from '../../src/app/app.js'


describe('Inventory – Acceptance test with auth', () => {
  let token: string;
  let userId:string;
  let articleId:string;

  beforeAll(async () => {
  const uniqueId = Date.now();

  const loginResponse = await request(app)
    .post('/auth/register')
    .send({
      role: "Admin",
      name: `Admin_${uniqueId}`,
      mail: `admin_${uniqueId}@mail.com`,
      password: 'password123'
    });
      

    expect(loginResponse.status).toBe(201);
    expect(loginResponse.body.token).toBeDefined();



    token = loginResponse.body.token;
    userId = loginResponse.body.id

    const createArticle = await request(app)
        .post('/article/add')
        .set('Authorization',`Bearer ${token}`)
        .send({
          name:"Farine", 
          unit:"Kg"
        })


    expect(createArticle.status).toBe(200);

    articleId = createArticle.body.id
  });



  it('should add an article on the inventory', async () => {
    const response = await request(app)
      .post(`/inventory/add/${articleId}`)
      .set('Authorization',`Bearer ${token}`)
      .send({
        quantity: 3
      });

    console.log(response.body)
    expect(response.status).toBe(200);
  });

  it('should not add an article on the inventory', async () => {
    const response = await request(app)
      .post(`/inventory/add/qsdqsd/${articleId}`)
      .set('Authorization',`Bearer ${token}`)
      .send({
        quantity: 3
      });

    console.log("test")
    expect(response.status).toBe(404);
  });

  it('should update the article quantity', async () => {
    const response = await request(app)
      .patch(`/inventory/update/${articleId}`)
      .set('Authorization',`Bearer ${token}`)
      .send({
        quantity: 5
      });

    expect(response.status).toBe(200);
  });

  it('should not update the article quantity', async () => {
    const response = await request(app)
      .patch(`/inventory/update/${articleId}`)
      .set('Authorization',`Bearer ${token}`)
      .send({
        quantity: ""
      });

    expect(response.status).toBe(400);
  });


  it('should get the article', async () => {
    const response = await request(app)
      .get(`/inventory/${articleId}`)
      .set('Authorization',`Bearer ${token}`)

    expect(response.status).toBe(200);
    console.log(response.body.article)
  });

   it('should get all the articles', async () => {
    const response = await request(app)
      .get('/inventory/')
      .set('Authorization',`Bearer ${token}`)

    expect(response.status).toBe(200);
    console.log(response.body.article)
  });

  it('should remove the article from the inventory', async () => {
    const response = await request(app)
      .delete('/inventory/delete/'+articleId)
      .set('Authorization',`Bearer ${token}`)

    expect(response.status).toBe(200);
  });

  afterAll(async ()=>{
    const deleteUser = await request(app)
      .delete('/user/admin/delete/'+userId)
      .set('Authorization',`Bearer ${token}`);

     const deleteArticle = await request(app)
      .delete('/article/delete/'+articleId)
      .set('Authorization',`Bearer ${token}`);


      expect(deleteUser.status).toBe(200);
      expect(deleteArticle.status).toBe(200);
  })
});
