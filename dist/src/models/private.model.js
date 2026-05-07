"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteHitoryUserById = exports.getHistoryVoteDownModal = exports.getHistoryVoteUpModal = exports.checkHistoryModal = exports.createHistoryModal = exports.findVotoDuplicado = exports.votePostModel = exports.DeletePostByIdForAdminModel = exports.DeletePostByIdModel = exports.createPostModel = exports.DeleteUserByIdModel = exports.getUserPostsModel = exports.getUserByIdModel = exports.findUserByIdModel = void 0;
const prisma_1 = require("../lib/prisma");
// Users
//passo 2 jwt
const findUserByIdModel = async (id) => {
    //pegar usuario do bd pelo id
    const existingUser = await prisma_1.prisma.user.findUnique({ where: { id: Number(id) } });
    if (!existingUser)
        return null;
    return existingUser;
};
exports.findUserByIdModel = findUserByIdModel;
const getUserByIdModel = async (id) => {
    //pegar usuario do bd pelo id
    const existingUser = await prisma_1.prisma.user.findUnique({
        where: { id: Number(id) },
        select: { id: true, name: true, email: true }
    });
    if (!existingUser)
        return null;
    return existingUser;
};
exports.getUserByIdModel = getUserByIdModel;
const getUserPostsModel = async (id) => {
    //pegar usuario do bd pelo id
    const existingUser = await prisma_1.prisma.post.findMany({
        where: { userId: Number(id) },
        select: {
            id: true,
            title: true,
            content: true,
            reactDown: true,
            reactUp: true,
            createdAt: true,
            userId: true,
            author: {
                select: {
                    name: true
                }
            }
        }
    });
    if (!existingUser)
        return null;
    return existingUser;
};
exports.getUserPostsModel = getUserPostsModel;
const DeleteUserByIdModel = async (id) => {
    //pegar usuario do bd pelo id
    const existingUser = await prisma_1.prisma.user.findUnique({ where: { id: Number(id) } });
    if (existingUser) {
        const userDeleted = await prisma_1.prisma.user.delete({ where: { id: Number(id) } });
        return userDeleted;
    }
    ;
    return null;
};
exports.DeleteUserByIdModel = DeleteUserByIdModel;
// Posts
const createPostModel = async (title, content, userId) => {
    //const existingUserId = await prisma.post.findFirst({where: {userId: Number(userId)}});
    const post = await prisma_1.prisma.post.create({
        data: { title, content, userId }
    });
    return post;
};
exports.createPostModel = createPostModel;
const DeletePostByIdModel = async (idPost, idUser) => {
    const existingPost = await prisma_1.prisma.post.findFirst({ where: {
            id: Number(idPost),
            userId: Number(idUser)
        } });
    if (existingPost) {
        const postDeleted = await prisma_1.prisma.post.delete({ where: { id: Number(idPost) } });
        return postDeleted;
    }
    ;
    console.log("Post não encontrado.");
    return null;
};
exports.DeletePostByIdModel = DeletePostByIdModel;
const DeletePostByIdForAdminModel = async (idPost) => {
    const existingPost = await prisma_1.prisma.post.findUnique({ where: {
            id: Number(idPost)
        } });
    if (existingPost) {
        const postDeleted = await prisma_1.prisma.post.delete({ where: { id: Number(idPost) } });
        return postDeleted;
    }
    ;
    console.log("Post não encontrado.");
    return null;
};
exports.DeletePostByIdForAdminModel = DeletePostByIdForAdminModel;
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
const votePostModel = async (postId, userId, react) => {
    const existingPost = await prisma_1.prisma.post.findUnique({ where: { id: postId } });
    if (!existingPost) {
        console.log("Post não encontrado.");
        return { error: "Post não encontrado.", status: 404 };
    }
    ;
    const existingVoto = await (0, exports.findVotoDuplicado)(userId, postId);
    if (existingVoto)
        return { error: "Você já votou nesse post.", status: 400 };
    const updatedPost = await prisma_1.prisma.post.update({ where: { id: postId }, data: {
            reactDown: react === "reactDown" ? existingPost.reactDown + 1 : existingPost.reactDown,
            reactUp: react === "reactUp" ? existingPost.reactUp + 1 : existingPost.reactUp
        } });
    await (0, exports.createHistoryModal)(userId, postId);
    return updatedPost;
};
exports.votePostModel = votePostModel;
// history
const findVotoDuplicado = async (userId, postId) => {
    const existingVoto = await prisma_1.prisma.history.findUnique({
        where: { userId_postId: { userId, postId } }
    });
    if (existingVoto) {
        return true;
    }
    return false;
};
exports.findVotoDuplicado = findVotoDuplicado;
const createHistoryModal = async (userId, postId) => {
    const history = await prisma_1.prisma.history.create({
        data: { userId, postId }
    });
    return history;
};
exports.createHistoryModal = createHistoryModal;
const checkHistoryModal = async (userId) => {
    const userHistoric = await prisma_1.prisma.history.findMany({ where: { userId } });
    if (!userHistoric)
        return null;
    return userHistoric;
};
exports.checkHistoryModal = checkHistoryModal;
const getHistoryVoteUpModal = async (userId) => {
    const userHistoric = await prisma_1.prisma.history.findMany({
        where: { userId },
        select: {
            post: {
                select: {
                    id: true,
                    title: true,
                    content: true,
                    reactUp: true,
                    reactDown: true,
                    userId: true,
                    createdAt: true,
                    author: {
                        select: { name: true }
                    }
                }
            }
        }
    });
    if (!userHistoric)
        return null;
    return userHistoric;
};
exports.getHistoryVoteUpModal = getHistoryVoteUpModal;
const getHistoryVoteDownModal = async (userId) => {
    const userHistoric = await prisma_1.prisma.history.findMany({
        where: { userId },
        select: {
            post: {
                select: {
                    id: true,
                    title: true,
                    content: true,
                    reactUp: true,
                    reactDown: true,
                    userId: true,
                    createdAt: true,
                    author: {
                        select: { name: true }
                    }
                }
            }
        }
    });
    if (!userHistoric)
        return null;
    return userHistoric;
};
exports.getHistoryVoteDownModal = getHistoryVoteDownModal;
const deleteHitoryUserById = async (userId) => {
    const deleteHistory = await prisma_1.prisma.history.deleteMany({
        where: { userId: userId }
    });
    if (!deleteHistory)
        return null;
    return deleteHistory;
};
exports.deleteHitoryUserById = deleteHitoryUserById;
// passo 3 refresh token: criar função que salva o refreshtoken no banco de dados, na pasta models
