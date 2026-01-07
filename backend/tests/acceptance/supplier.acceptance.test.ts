import request from 'supertest';
import { describe, it, expect, beforeAll,afterAll} from '@jest/globals';
import app from '../../src/app/app.js'


describe('Supplier – Acceptance test with auth', () => {
  let token: string;
  let user_id:string;
  let supplier_id:string;
  let article_id:string;

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
    user_id = loginResponse.body.user.id

     const createArticle = await request(app)
        .post('/article/add')
        .set('Authorization',`Bearer ${token}`)
        .send({
          name:"Farine", 
          unit:"Kg"
        })


    expect(createArticle.status).toBe(200);

    article_id = createArticle.body.article.id

  });



  it('should create a supplier', async () => {
    const response = await request(app)
      .post('/supplier/admin/create')
      .set('Authorization',`Bearer ${token}`)
      .send({
        contact_name:"supplier",
        mail:"supplier@mail.com",
        phone:"+33699298796",
        address: "address"
      });

    expect(response.status).toBe(200);

    expect(response.body.supplier.id).toBeDefined();
    supplier_id = response.body.supplier.id;
    expect(Number.isInteger(supplier_id)).toBe(true);

  });

  it('should get a specific supplier', async () => {
    const response = await request(app)
      .get(`/supplier/${supplier_id}`)
      .set('Authorization',`Bearer ${token}`)

    expect(response.status).toBe(200);
    console.log(response.body)
  });

  it('should not update a specific supplier', async () => {
    const response = await request(app)
      .patch('/supplier/admin/update/'+supplier_id)
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
      .post(`/supplier/${supplier_id}/admin/add/article/${article_id}`)
      .set('Authorization',`Bearer ${token}`)

    expect(response.status).toBe(200);
  });

    it('should get all articles from a specific supplier', async () => {
    const response = await request(app)
      .get(`/supplier/${supplier_id}/articles`)
      .set('Authorization',`Bearer ${token}`)

    expect(response.status).toBe(200);
    console.log(response.body)
  });

  it('should delete an article from a specific supplier', async () => {
    const response = await request(app)
      .delete(`/supplier/${supplier_id}/admin/delete/article/${article_id}`)
      .set('Authorization',`Bearer ${token}`)

    expect(response.status).toBe(200);
  });

    it('should delete a specific supplier', async () => {
    const response = await request(app)
      .delete('/supplier/admin/delete/'+supplier_id)
      .set('Authorization',`Bearer ${token}`)

    expect(response.status).toBe(200);
    console.log(response.body)
  });



   afterAll(async ()=>{
    const deleteUser = await request(app)
      .delete(`/user/admin/delete/${user_id}`)
      .set('Authorization',`Bearer ${token}`);


      expect(deleteUser.status).toBe(200);
  })

});
