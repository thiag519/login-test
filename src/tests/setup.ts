import dotenv from 'dotenv';
import { prisma } from '../lib/prisma';

jest.mock('uuid', () => ({
  v4: () => 'test-uuid',
}));
dotenv.config({
  path: '.env.test',
});

/*
 beforeEach( async () => {
    await prisma.$transaction([
      prisma.post.deleteMany(),
      prisma.user.deleteMany()
    ])
  });

  afterAll( async () => {
    await prisma.$disconnect();
  });
*/


//console.log(process.env.DATABASE_URL);
