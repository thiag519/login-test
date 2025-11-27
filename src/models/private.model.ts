import { prisma } from "../lib/prisma"


//passo 2 jwt
export const findUserByIdModel = async (id: number) => {
  //pegar usuario do bd pelo id
  const existingUser = await prisma.user.findUnique({where: {id: Number(id)}});
  console.log("Usuario findUserByIdModel :",existingUser);
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

export const createPostModel = async (title:string, content: string, userId: number) => {
  //const existingUserId = await prisma.post.findFirst({where: {userId: Number(userId)}});

  const post = await prisma.post.create({
    data: {title, content, userId}
  });
  return post;
};

// passo 3 refresh token: criar função que salva o refreshtoken no banco de dados, na pasta models