//import { User } from "@prisma/client";
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
  const userAll = await prisma.user.findMany();
  if(!userAll) return null;
  return userAll;
};


export const getUserNameModal = async (nome:string) => {
  const user = await prisma.user.findFirst({where : {name:{contains:nome, mode: 'insensitive'} }});
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