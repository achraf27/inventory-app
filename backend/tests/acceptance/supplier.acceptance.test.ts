import request from 'supertest';
import { describe, it, expect, beforeAll,afterAll} from '@jest/globals';
import app from '../../src/app/app.js'


describe('Supplier – Acceptance test with auth', () => {
  let token: string;
  let userId:string;
  let supplierId:string;
  let articleId:string;

  beforeAll(async () => {
    const loginResponse = await request(app)
      .post('/auth/register')
      .send({
        role:"Admin",
        name:"Achraf",
        mail: 'admin@mail.com',
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



  it('should create a supplier', async () => {
    const response = await request(app)
      .post('/supplier/create/')
      .set('Authorization',`Bearer ${token}`)
      .send({
        contact_name:"supplier",
        mail:"supplier@mail.com",
        phone:"+33699298796",
        address: "address"
      });

    expect(response.status).toBe(200);

    supplierId = response.body.id;
  });

  it('should get a specific supplier', async () => {
    const response = await request(app)
      .get('/supplier/'+supplierId)
      .set('Authorization',`Bearer ${token}`)

    expect(response.status).toBe(200);
    console.log(response.body)
  });

  it('should not update a specific supplier', async () => {
    const response = await request(app)
      .patch('/supplier/update/'+supplierId)
      .set('Authorization',`Bearer ${token}`)
      .send({
        contact_name:null,
        mail:undefined,
        phone:"",
        // address: ""
      })

    expect(response.status).toBe(400);
    console.log(response.body)
  });



   it('should add an article to a specific supplier', async () => {
    const response = await request(app)
      .post(`/supplier/${supplierId}/add/article/${articleId}`)
      .set('Authorization',`Bearer ${token}`)

    expect(response.status).toBe(200);
  });

    it('should get an article from a specific supplier', async () => {
    const response = await request(app)
      .get(`/supplier/${supplierId}/article`)
      .set('Authorization',`Bearer ${token}`)

    expect(response.status).toBe(200);
    console.log(response.body)
  });

  it('should delete an article from a specific supplier', async () => {
    const response = await request(app)
      .delete(`/supplier/${supplierId}/article/delete/${articleId}`)
      .set('Authorization',`Bearer ${token}`)

    expect(response.status).toBe(200);
  });

    it('should delete a specific supplier', async () => {
    const response = await request(app)
      .delete('/supplier/delete/'+supplierId)
      .set('Authorization',`Bearer ${token}`)

    expect(response.status).toBe(200);
    console.log(response.body)
  });



   afterAll(async ()=>{
    const deleteUser = await request(app)
      .delete('/user/delete/'+userId)
      .set('Authorization',`Bearer ${token}`);


      expect(deleteUser.status).toBe(200);
  })

});
