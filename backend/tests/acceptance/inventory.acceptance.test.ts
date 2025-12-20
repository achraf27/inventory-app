import request from 'supertest';
import { describe, it, expect,beforeAll} from '@jest/globals';
import app from '../../src/app/app'


describe('Inventory – Acceptance test with auth', () => {
  let token: string;

  beforeAll(async () => {
    // 1️⃣ LOGIN
    const loginResponse = await request(app)
      .post('/auth/login')
      .send({
        mail: 'admin@mail.com',
        password: 'password123'
      });

    expect(loginResponse.status).toBe(200);
    expect(loginResponse.body.token).toBeDefined();

    token = loginResponse.body.token;
  });

  it('should add an article to inventory (authenticated)', async () => {
    const response = await request(app)
      .post('/inventory/add')
      .set('Authorization', `Bearer ${token}`)
      .send({
        userId: 1,
        articleId: 2,
        quantity: 3
      });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      articleId: 2,
      quantity: 3
    });
  });

  it('should fail without token', async () => {
    const response = await request(app)
      .post('/inventory/add')
      .send({
        userId: 1,
        articleId: 2,
        quantity: 3
      });

    expect(response.status).toBe(401);
  });
});
