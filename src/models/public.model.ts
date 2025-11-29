import bcrypt from 'bcryptjs';
import { prisma } from "../lib/prisma";


export const createUserModel = async ( name:string, email:string, password:string) => {
  const existing = await prisma.user.findUnique({where : {email}});
  if(existing) return null;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {name, email, password: hashedPassword}
  });
  return user;
};


export const getUsersModel = async () => {
  let page = 1;
  let skip = (page - 1) * 10;
  const userAll = await prisma.user.findMany(
    {
      orderBy:{createdAt: 'desc'},
      skip: skip,
      take: 10,
      select: {
      name:true,
      createdAt:true,
      _count:{select: {posts:true}}
    }}
  );
  if(!userAll) return null;
  return userAll;
};

export const getPostsModel = async () => {
  let page = 1;
  let skip = (page - 1) * 10;
  const postsAll = await prisma.post.findMany(
    {
      orderBy:{createdAt: 'desc'},
      skip: skip,
      take: 10,
      select: {
      id:true,
      title: true,
      content: true,
      reactDown: true,
      reactUp: true,
      createdAt:true
    }}
  );
  if(!postsAll) return null;
  return postsAll;
};


export const getUserNameModal = async (nome:string) => {
  const user = await prisma.user.findMany({
    where : {
      name:{
        startsWith:nome, mode: 'insensitive'
      } 
    }
  });
  if(!user) return null;
  return user;
};

// passo 3 jwt
export const findUserEmailPasswordModal = async (email:string, password:string) => {
  const existingUser = await prisma.user.findUnique({where: {email}});
  
  if(!existingUser) {
    console.log("Usuário não encontrado");
    return null;
  }
  const match = await bcrypt.compare(password, existingUser.password);
  if(!match) {
    console.log("Senha incorreta");
    return null;
  } 
  return existingUser;
}