"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchPasswordModal = exports.findUserEmailPasswordModal = exports.getUserByIdModal = exports.getUsersNameModal = exports.getPostsModel = exports.getUsersModel = exports.createUserModel = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma_1 = require("../lib/prisma");
const createUserModel = async (name, email, password) => {
    const existing = await prisma_1.prisma.user.findUnique({ where: { email } });
    if (existing)
        return null;
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    const user = await prisma_1.prisma.user.create({
        data: { name, email, password: hashedPassword }
    });
    //const token = createUserTokenService(user)
    return { user };
};
exports.createUserModel = createUserModel;
const getUsersModel = async (pags) => {
    pags < 1 ? pags = 1 : pags = pags;
    let skip = (pags - 1) * 2;
    const userAll = await prisma_1.prisma.user.findMany({
        orderBy: { createdAt: 'desc' },
        skip: skip,
        take: 2,
        select: {
            id: true,
            name: true,
            createdAt: true,
            _count: { select: { posts: true } }
        }
    });
    if (userAll.length === 0)
        return null;
    return userAll;
};
exports.getUsersModel = getUsersModel;
const getPostsModel = async (pags) => {
    pags < 1 ? pags = 1 : pags = pags;
    /*let take = pags + 2;
    let skip = (pags - 1) * take ;
    */
    let skip = 0;
    let take = 2 + pags;
    const postsAll = await prisma_1.prisma.post.findMany({
        orderBy: { createdAt: 'desc' },
        skip,
        take,
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
    if (postsAll.length === 0)
        return null;
    return postsAll;
};
exports.getPostsModel = getPostsModel;
const getUsersNameModal = async (nome) => {
    const user = await prisma_1.prisma.user.findMany({
        where: {
            name: {
                startsWith: nome, mode: 'insensitive',
            }
        }
    });
    if (!user)
        return null;
    return user;
};
exports.getUsersNameModal = getUsersNameModal;
const getUserByIdModal = async (id) => {
    const user = await prisma_1.prisma.user.findUnique({
        where: { id: id },
        select: {
            name: true,
            createdAt: true,
            posts: {
                select: {
                    title: true,
                    content: true,
                    reactUp: true,
                    reactDown: true
                }
            }
        }
    });
    if (!user)
        return null;
    return user;
};
exports.getUserByIdModal = getUserByIdModal;
// passo 3 jwt
const findUserEmailPasswordModal = async (email, password) => {
    const existingUser = await prisma_1.prisma.user.findUnique({ where: { email } });
    if (!existingUser) {
        console.log("Usuário não encontrado");
        return null;
    }
    const match = await (0, exports.matchPasswordModal)(password, existingUser.password); //bcrypt.compare(password, existingUser.password);
    if (!match) {
        console.log("Senha incorreta");
        return null;
    }
    return existingUser;
};
exports.findUserEmailPasswordModal = findUserEmailPasswordModal;
const matchPasswordModal = async (password, hashPassword) => {
    try {
        if (!password || !hashPassword)
            return false;
        return bcryptjs_1.default.compare(password, hashPassword);
    }
    catch (err) {
        console.error('Erro ao comparar senha:', err);
        return false;
    }
};
exports.matchPasswordModal = matchPasswordModal;
