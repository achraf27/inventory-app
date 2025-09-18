const request = require("supertest");
const app = require("./app");

describe("Test the root path", () => {
  test("It should response the GET method", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });
});

describe('POST /auth', () => {
    it('devrait se connecter', async () => {
      const res = await request(app)
        .post('/auth')
        .send({ username: 'test', password: '123' }) 
  
      expect(res.statusCode).toBe(201);
      expect(res.body.message).toBe('Login successful')
    });
  
    it('devrait renvoyer une erreur de connexion', async () => {
      const res = await request(app)
        .post('/auth')
        .send({username:'test',password:'12'});
  
      expect(res.statusCode).toBe(401);
      expect(res.body.error).toBe('Invalid credentials');
    });
  });