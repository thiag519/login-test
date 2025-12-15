import { prisma } from "../lib/prisma"

export type Reacting =  {
  reactUp:string;
  reactDown:string;
}


// Users

//passo 2 jwt
export const findUserByIdModel = async (id: number) => {
  //pegar usuario do bd pelo id
  const existingUser = await prisma.user.findUnique({where: {id: Number(id)}});
  if(!existingUser) return null;
  return existingUser;
}

export const getUserByIdModel = async (id: number) => {
  //pegar usuario do bd pelo id
  const existingUser = await prisma.user.findUnique({
    where: {id: Number(id)},
    select: {id:true, name: true, email:true}
  });
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


// Posts

export const createPostModel = async (title:string, content: string,userId:number) => {
  //const existingUserId = await prisma.post.findFirst({where: {userId: Number(userId)}});
  const post = await prisma.post.create({
    data: {title, content,userId}
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

/*export const votePostUpModel = async (idPost: number) => {
  const existingPost = await prisma.post.findFirst({where: {
    id: Number(idPost)
  }});
  if(!existingPost) {
    console.log("Post não encontrado.")
    return null;
  };
  const postUp = await prisma.post.update({where: {id: idPost},data: {reactUp: existingPost.reactUp += 1}});
  return postUp;
};*/

export const votePostModel = async (postId: number, userId:number, react:string) => {
  const existingPost = await prisma.post.findUnique({where:{id: postId }});
  if(!existingPost) {
    console.log("Post não encontrado.")
    return {error: "Post não encontrado.", status: 404 };
  };

  const existingVoto = await findVotoDuplicado(userId, postId);

  if(existingVoto) return {error: "Você já votou nesse post.", status: 400};

  const updatedPost = await prisma.post.update({where: {id: postId},data: {
    reactDown: react === "reactDown"? existingPost.reactDown + 1: existingPost.reactDown,
    reactUp: react === "reactUp"? existingPost.reactUp + 1: existingPost.reactUp
  }});

  await createHistoryModal(userId, postId);
  return updatedPost;

};


// history
export const findVotoDuplicado = async (userId:number, postId:number) => {
  const existingVoto = await prisma.history.findUnique({
    where: {userId_postId: {userId, postId}}
  });
  if(existingVoto){
    return true
  }
  return false
}

export const createHistoryModal = async (userId:number, postId:number) => {
  const history = await prisma.history.create({
    data: {userId, postId}
  });
  return history;
};

export const checkHistoryModal = async (userId:number) => {
  const userHistoric = await prisma.history.findMany({where: {userId}});
  if(!userHistoric) return null;
  return userHistoric;
};

export const deleteHitoryUserById = async (userId:number) => {
  const deleteHistory = await prisma.history.deleteMany({
    where:{userId: userId}
  });
  if(!deleteHistory) return null;
  return deleteHistory;
}



// passo 3 refresh token: criar função que salva o refreshtoken no banco de dados, na pasta models