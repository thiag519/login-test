import request from 'supertest';
import app from '../app';
import { prisma } from '../lib/prisma';
import e from 'express';

describe('Testing public router', () => {
  beforeAll( async () => {
    await prisma.$transaction([
      prisma.post.deleteMany(),
      prisma.user.deleteMany()
    ])
  });
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


  it('should ping pong', async () => {
    const response = await request(app).get('/public/ping');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({pong: true});
  });

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
      .get('/public/users');
    expect(response.status).toBe(200);
    expect(response.body.users.length).toBeGreaterThanOrEqual(1);
    expect(response.body).toHaveProperty('success', true);
  });

})