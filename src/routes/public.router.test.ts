import request from 'supertest';
import app from '../app';
import { prisma } from '../lib/prisma';

describe.skip('Testing public router', () => {

  /*beforeAll( async () => {
    await prisma.$transaction([
      prisma.post.deleteMany(),
      prisma.user.deleteMany()
    ])
  });*/

  afterAll( async () => {
    await prisma.$transaction([
      prisma.post.deleteMany(),
      prisma.user.deleteMany()
    ])
  });

  afterAll( async () => {
    await prisma.$disconnect();
  });

  let name = 'Jest Test';
  let email = 'test@jest.com';
  let password = '123456';

  /*it('should ping pong', async () => {
    const response = await request(app).get('/public/ping');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({pong: true});
  });*/

  /*it('should ping pong',  (done) => {
    request(app)
      .get('/public/ping')
      .then( response => {
        expect(response.body.pong).toBeTruthy();
        return done()
      })
  });*/

  it('should register a new user',async () => {
    const response = await request(app)
      .post('/public/cadastro')
      .send({name,email,password});
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('userData');
  });

  it('should not allow to register with an existing email',async () => {
    const response = await request(app)
      .post('/public/cadastro')
      .send({name,email,password});
        expect(response.status).toBe(409);
        expect(response.body.error).not.toBeNull();
  });

  it('should not allow to register without email',async () => {
    const response = await request(app)
      .post('/public/cadastro')
      .send({name,password});
        expect(response.status).toBe(400);
        expect(response.body.error).not.toBeNull();
  });

  it('should not allow to register without name',async () => {
    const response = await request(app)
      .post('/public/cadastro')
      .send({email,password});
        expect(response.status).toBe(400);
        expect(response.body.error).not.toBeNull();
  });

  it('should not allow to register without password',async () => {
    const response = await request(app)
      .post('/public/cadastro')
      .send({name,email});
        expect(response.status).toBe(400);
        expect(response.body.error).not.toBeNull();
  });

  it('should not allow to register without any data',async () => {
    const response = await request(app)
      .post('/public/cadastro')
      .send({});
        expect(response.status).toBe(400);
        expect(response.body.error).not.toBeNull();
  });

  //login

   it('should login correctly',async () => {
    const response = await request(app)
      .post('/public/login')
      .type('form')
      .send({email, password});
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('user');
  });

  it('should not login with incorrect data',async () => {
    const response = await request(app)
      .post('/public/login')
      .type('form')
      .send({email,password:'ivalid'});
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('error');
  });

  it('should not login without some data',async () => {
    const response = await request(app)
      .post('/public/login')
      .type('form')
      .send({email});
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('error');
  });

// usuários
  it('should get all users', async () => {
    const response = await request(app)
      .get(`/public/users/${1}`);
    expect(response.status).toBe(200);
    expect(response.body.users.length).toBeGreaterThanOrEqual(1);
    expect(response.body).toHaveProperty('success', true);
  });

  it('should get all users, because if the pags is invalid, the pags will become 1', async () => {
    let pags: number = Number(null) || 1;
    const response = await request(app)
      .get(`/public/users/${pags}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('success', true);

  });

  it.skip('should not get users, because it not have users', async () => {
    let pags: number = Number(null) || 1;
    /*await prisma.$transaction([
      prisma.user.deleteMany()
    ])*/
    const response = await request(app)
      .get(`/public/users/${pags}`);
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('success', false);
    
  });

  it('should not get users, because not have more users', async () => {
    let pags: number =  30;
    const response = await request(app)
      .get(`/public/users/${pags}`);
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('success', false);

  });

  it('should not get users without corect router', async () => {
    const response = await request(app)
      .get('/public/users');
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error');
    expect(response.body.path).toBe('/public/users');
  });

});