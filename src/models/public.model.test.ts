import { User } from '../../generated/prisma/client';
import { prisma } from '../lib/prisma';
import * as publicModal from './public.model'

describe('Testing user model public', () => {

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
  })

  let email = 'teste@gamail.com';
  let name = 'Alex';
  let password = '123456';

  

  it('should create a new user ', async () => {
    const newUser = await publicModal.createUserModel(name, email, password);
    expect(newUser).not.toBeNull();
    expect(newUser).toHaveProperty('user');
    expect(newUser?.user.email).toBe(email);
  });

  it('should not allow to create a user with existing email', async () => {
    const newUser = await publicModal.createUserModel(name, email, password);
    expect(newUser).toBeNull();

  });

  it('should find a user by the email', async () => {
    const user = await publicModal.findUserEmailPasswordModal(email, password);
    expect(user).not.toBeNull();
    expect(user?.email).toBe(email);
  })

  it('should get user by name', async () => {
    const users = await publicModal.getUserNameModal(name);
    expect(users).not.toBeNull();
  });

  it('should match the password from database', async () => {
    const user = await publicModal.findUserEmailPasswordModal(email, password) as User;
    const match = await publicModal.matchPasswordModal(password, user.password);
    expect(match).toBeTruthy();
  });

  it('should not match the password from database', async () => {
    const user = await publicModal.findUserEmailPasswordModal(email, password) as User;
    const match = await publicModal.matchPasswordModal('invalid', user.password);
    expect(match).toBeFalsy();
  });

  it('should get a list of users', async () => {
    const users = await publicModal.getUsersModel() ;
    expect(users?.length).toBeGreaterThanOrEqual(1);
    users?.forEach( (user) => {
      expect(user).toHaveProperty('id')
    })
  });

}) 