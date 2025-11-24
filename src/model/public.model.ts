//import { User } from "@prisma/client";
import { User } from "../../generated/prisma/client";
import { prisma } from "../lib/prisma";


export const createUserModel = async ( name:string, email:string, password:string) => {
  
  const existing = await prisma.user.findUnique({where : {email}});
  if(existing) {
    return null;
  }
  const user = await prisma.user.create({
    data: {name, email, password}
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