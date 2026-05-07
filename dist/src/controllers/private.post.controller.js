"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHistoryVoteDownByUserId = exports.getHistoryVoteUpByUserId = exports.getHistoryByUserId = exports.deleteAllHistory = exports.votePostUp = exports.votePostDown = exports.deletePost = exports.createPost = exports.getUserPosts = void 0;
const postSchemaCreate_1 = require("../validations/postSchemaCreate");
const private_model_1 = require("../models/private.model");
// Pegar posts do usuário autenticado
const getUserPosts = async (req, res) => {
    try {
        const { id } = req.params;
        const posts = await (0, private_model_1.getUserPostsModel)(Number(id));
        if (posts == null) {
            return res.status(401).json({ success: false, error: "Posts do usuário não encontrado." });
        }
        ;
        //console.log(posts)
        return res.status(200).json({ success: true, message: "Posts do usuário encontrado.", posts });
    }
    catch (err) {
        return res.status(500).json({ success: false, error: "Erro ao buscar Posts do usuário.", err });
    }
    ;
};
exports.getUserPosts = getUserPosts;
// Crear post
const createPost = async (req, res) => {
    const user = req.user;
    const userId = user.id;
    const parsedData = postSchemaCreate_1.postSchemaCreate.safeParse(req.body);
    if (!parsedData.success) {
        const errors = parsedData.error.issues.map(issue => issue.message);
        return res.status(400).json({ success: false, error: 'Dados inválidos', details: errors });
    }
    try {
        const { title, content } = parsedData.data;
        if (!content)
            return res.status(401).json({ success: false, error: "Dados imcompletos. " });
        const newPost = await (0, private_model_1.createPostModel)(title, content, userId);
        return res.status(201).json({ success: true, newPost });
    }
    catch (err) {
        return res.status(500).json({ success: false, error: "Erro ao criar post.", err });
    }
};
exports.createPost = createPost;
// Deletar post
const deletePost = async (req, res) => {
    const user = req.user;
    const idUser = user.id;
    try {
        const { idPost } = req.params;
        if (user.role === "ADMIN") {
            const postDeletedForAdmin = await (0, private_model_1.DeletePostByIdForAdminModel)(Number(idPost));
            if (!postDeletedForAdmin) {
                return res.status(401).json({ success: false, error: "Post ou usuário não encontrado." });
            }
            ;
            return res.status(200).json({ success: true, message: "Post deletado com sucesso.", postDeletedForAdmin });
        }
        else {
            //console.log("id do post: ",idPost," id do user: ",idUser)
            const postDeleted = await (0, private_model_1.DeletePostByIdModel)(Number(idPost), Number(idUser));
            if (!postDeleted) {
                return res.status(401).json({ success: false, error: "Post ou usuário não encontrado." });
            }
            ;
            return res.status(200).json({ success: true, message: "Post deletado com sucesso.", postDeleted });
        }
        ;
    }
    catch (err) {
        return res.status(500).json({ success: false, error: "Erro ao excluir post.", err });
    }
    ;
};
exports.deletePost = deletePost;
// Curtir post
const votePostDown = async (req, res) => {
    const user = req.user;
    const userId = user.id;
    try {
        const { idPost } = req.params;
        const voteDown = 'reactDown';
        const postVoteDow = await (0, private_model_1.votePostModel)(Number(idPost), userId, voteDown);
        if ("error" in postVoteDow) {
            return res.status(postVoteDow.status).json({ error: postVoteDow.error });
        }
        ;
        return res.status(200).json({ success: true, message: "Voto feito com sucesso.", postVoteDow });
    }
    catch (err) {
        return res.status(500).json({ success: false, error: "Erro ao fazer a votação.", err });
    }
    ;
};
exports.votePostDown = votePostDown;
const votePostUp = async (req, res) => {
    const user = req.user;
    const userId = user.id;
    try {
        const { idPost } = req.params;
        const voteUp = 'reactUp';
        const postVoteUp = await (0, private_model_1.votePostModel)(Number(idPost), userId, voteUp);
        if ("error" in postVoteUp) {
            return res.status(postVoteUp.status).json({ error: postVoteUp.error });
        }
        ;
        return res.status(201).json({ success: true, message: "Voto feito com sucesso.", /*postVoteUp*/ });
    }
    catch (err) {
        return res.status(500).json({ success: false, error: "Erro ao fazer a votação.", err });
    }
    ;
};
exports.votePostUp = votePostUp;
// History
const deleteAllHistory = async (req, res) => {
    const user = req.user;
    const userId = user.id;
    try {
        const historyDeleted = await (0, private_model_1.deleteHitoryUserById)(Number(userId));
        if (!historyDeleted) {
            return res.status(404).json({ success: false, error: "Historico não encontrado." });
        }
        ;
        return res.status(201).json({ success: true, message: 'Historico limpo com sucesso.' });
    }
    catch (err) {
        return res.status(500).json({ success: false, error: "Erro ao limpar historico.", err });
    }
};
exports.deleteAllHistory = deleteAllHistory;
const getHistoryByUserId = async (req, res) => {
    const user = req.user;
    const userId = user.id;
    try {
        const historyUser = await (0, private_model_1.checkHistoryModal)(userId);
        if (!historyUser) {
            return res.status(401).json({ success: false, error: "Historico não encontrado." });
        }
        ;
        return res.status(200).json({ success: true, message: 'Historico de curtidas do usuario.', historyUser });
    }
    catch (err) {
        return res.status(500).json({ success: false, error: "Erro ao listar historico.", err });
    }
    ;
};
exports.getHistoryByUserId = getHistoryByUserId;
const getHistoryVoteUpByUserId = async (req, res) => {
    const user = req.user;
    const userId = user.id;
    try {
        const postsUp = await (0, private_model_1.getHistoryVoteUpModal)(userId);
        if (!postsUp) {
            return res.status(401).json({ success: false, error: "Historico não encontrado." });
        }
        ;
        return res.status(200).json({ success: true, postsUp });
    }
    catch (err) {
        return res.status(500).json({ success: false, error: "Erro ao listar historico.", err });
    }
    ;
};
exports.getHistoryVoteUpByUserId = getHistoryVoteUpByUserId;
const getHistoryVoteDownByUserId = async (req, res) => {
    const user = req.user;
    const userId = user.id;
    try {
        const postsDown = await (0, private_model_1.getHistoryVoteDownModal)(userId);
        if (!postsDown) {
            return res.status(401).json({ success: false, error: "Historico não encontrado." });
        }
        ;
        return res.status(200).json({ success: true, postsDown });
    }
    catch (err) {
        return res.status(500).json({ success: false, error: "Erro ao listar historico.", err });
    }
    ;
};
exports.getHistoryVoteDownByUserId = getHistoryVoteDownByUserId;
