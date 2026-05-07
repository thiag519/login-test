"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const public_controller_1 = require("../controllers/public.controller");
const localStrategyAuth_1 = require("../middlewares/localStrategyAuth");
const multer_1 = require("../lib/multer");
const router = (0, express_1.Router)();
router.get('/ping', (req, res) => res.json({ pong: true }));
router.post('/cadastro', public_controller_1.createUser);
router.get("/users/:page", public_controller_1.getAllUsers);
router.get("/feed/:page", public_controller_1.getAllPosts);
router.get("/feed/user/:name", public_controller_1.getUsersName);
router.get("/feed/user/info/:id", public_controller_1.getUserById);
router.post("/login", localStrategyAuth_1.localStrategyAuth, public_controller_1.loginUser);
//Ezibir todos os posts
router.get("/posts", public_controller_1.getAllPosts);
//Exibir post por título 
router.post('/upload', multer_1.upload.single('arquivo'), public_controller_1.uploadController);
exports.default = router;
