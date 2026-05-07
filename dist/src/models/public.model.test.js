"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../lib/prisma");
const publicModal = __importStar(require("./public.model"));
describe('Testing user model public', () => {
    beforeAll(async () => {
        await prisma_1.prisma.$transaction([
            prisma_1.prisma.post.deleteMany(),
            prisma_1.prisma.user.deleteMany()
        ]);
    });
    afterAll(async () => {
        await prisma_1.prisma.$transaction([
            prisma_1.prisma.post.deleteMany(),
            prisma_1.prisma.user.deleteMany()
        ]);
    });
    afterAll(async () => {
        await prisma_1.prisma.$disconnect();
    });
    let email = 'teste@gamail.com';
    let name = 'Alex';
    let password = '123456';
    it('should create a new user ', async () => {
        const newUser = await publicModal.createUserModel(name, email, password);
        expect(newUser).not.toBeNull();
        expect(newUser).toHaveProperty('user');
        expect(newUser?.user.email).toBe(email);
    });
    it('should not allow to create a user with existing email', async () => {
        const newUser = await publicModal.createUserModel(name, email, password);
        expect(newUser).toBeNull();
    });
    it('should find a user by the email', async () => {
        const user = await publicModal.findUserEmailPasswordModal(email, password);
        expect(user).not.toBeNull();
        expect(user?.email).toBe(email);
    });
    it('should get user by name', async () => {
        const users = await publicModal.getUsersNameModal(name);
        expect(users).not.toBeNull();
    });
    it('should match the password from database', async () => {
        const user = await publicModal.findUserEmailPasswordModal(email, password);
        const match = await publicModal.matchPasswordModal(password, user.password);
        expect(match).toBeTruthy();
    });
    it('should not match the password from database', async () => {
        const user = await publicModal.findUserEmailPasswordModal(email, password);
        const match = await publicModal.matchPasswordModal('invalid', user.password);
        expect(match).toBeFalsy();
    });
    it('should get a list of users', async () => {
        const users = await publicModal.getUsersModel(1);
        expect(users?.length).toBeGreaterThanOrEqual(1);
        users?.forEach((user) => {
            expect(user).toHaveProperty('id');
        });
    });
});
