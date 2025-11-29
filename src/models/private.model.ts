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

export const createPostModel = async (title:string, content: string, userId: number,reactDown:number,reactUp:number) => {
  //const existingUserId = await prisma.post.findFirst({where: {userId: Number(userId)}});
  reactDown = 0;
  reactUp = 0;
  const post = await prisma.post.create({
    data: {title, content, userId, reactDown, reactUp}
  });
  return post;
};


export const DeletePostByIdModel = async (idPost: number, idUser:number) => {
  const existingPost = await prisma.post.findFirst({where: {
    id: Number(idPost),
    userId: Number(idUser)
  }});
  if(existingPost) {
    const postDeleted = await prisma.post.delete({where: {id: Number(idPost)}});
    return postDeleted;
  };
  console.log("Post não encontrado.")
  return null;
}

export const votePostUpModel = async (idPost: number) => {
  const existingPost = await prisma.post.findFirst({where: {
    id: Number(idPost)
  }});
  if(!existingPost) {
    console.log("Post não encontrado.")
    return null;
  };
  const postUp = await prisma.post.update({where: {id: idPost},data: {reactUp: existingPost.reactUp += 1}});
  return postUp;
};

export const votePostDownModel = async (idPost: number) => {
  const existingPost = await prisma.post.findFirst({where: {
    id: Number(idPost)
  }});
  if(!existingPost) {
    console.log("Post não encontrado.")
    return null;
  };
  const postDown = await prisma.post.update({where: {id: idPost},data: {reactDown: existingPost.reactDown += 1}});
  return postDown;
  
}



// passo 3 refresh token: criar função que salva o refreshtoken no banco de dados, na pasta models