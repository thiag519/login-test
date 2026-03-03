import request from 'supertest';
import app from '../app';
import { prisma } from '../lib/prisma';

describe('Testing private router', () => {

  /*beforeAll( async () => {
    await prisma.$transaction([
      prisma.post.deleteMany(),
      prisma.user.deleteMany()
    ])
  });*/

  require('dotenv').config();

  let token: string;
  let userId: number;
  beforeAll( async () => {
    const user = await prisma.user.create({
      data: {
        name: 'Jest Test',
        email: 'test@jest.com',
        password: '123456'
      }
    });
    userId = user.id;
    const jwt = require('jsonwebtoken');
    token = jwt.sign({id: userId}, process.env.JWT_KEY, {expiresIn: '1h'});
  })

  afterAll( async () => {
    await prisma.$transaction([
      prisma.post.deleteMany(),
      prisma.user.deleteMany()
    ])
  });

  afterAll( async () => {
    await prisma.$disconnect();
  });

  let title = 'Titulo qualquer';
  let content = 'algo sobre o titulo';

  it('should create a new post',async () => { 
    const response = await request(app)
      .post(`/private/post/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({title,content});
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('newPost');
  });

  it('should not create a new post with invalid token',async () => { 
    const response = await request(app)
      .post(`/private/post/${userId}`)
      .set('Authorization', `Bearer invalidtoken`)
      .send({title,content});
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('error');
  });

  it('should not create a new post without authorization',async () => { 
    const response = await request(app)
      .post(`/private/post/${userId}`)
      .send({title,content});
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('error');
  });

  it('should not create a new post, if userId differs from param',async () => { 
    const response = await request(app)
      .post(`/private/post/${3}`)
      .set('Authorization', `Bearer ${token}`)
      .send({title,content});
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error');
  });

  it('should not allow to create post with an empty content',async () => {
    const response = await request(app)
      .post(`/private/post/${userId}`)
      .send({title,content: ''});
        expect(response.status).toBe(401);
        expect(response.body.error).not.toBeNull();
  });

  it('should not allow to create post without content',async () => {
    const response = await request(app)
      .post(`/private/post/${userId}`)
      .send({title});
        expect(response.status).toBe(401);
        expect(response.body.error).not.toBeNull();
  });

  it('should not allow to create post without any data',async () => {
    const response = await request(app)
      .post(`/private/post/${userId}`)
      .send({});
        expect(response.status).toBe(401);
        expect(response.body.error).not.toBeNull();
  });
});