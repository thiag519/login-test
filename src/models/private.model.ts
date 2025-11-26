import { prisma } from "../lib/prisma"


//passo 2 jwt
export const findUserByIdModel = async (id: number) => {
  //pegar usuario do bd pelo id
  const existingUser = await prisma.user.findUnique({where: {id: Number(id)}});
  console.log(existingUser);
  if(!existingUser) return null;
  return existingUser;
}

export const DeleteUserByIdModel = async (id: number) => {
  //pegar usuario do bd pelo id
  const existingUser =  await prisma.user.findUnique({where: {id: Number(id)}});
  if(existingUser) {
    const userDeleted = await prisma.user.delete({where: {id: Number(id)}});
    return userDeleted;
  };
  return null;
}