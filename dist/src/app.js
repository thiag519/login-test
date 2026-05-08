"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const public_routes_1 = __importDefault(require("./routes/public.routes"));
const private_routes_1 = __importDefault(require("./routes/private.routes"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const jwtStrategyAuth_1 = require("./middlewares/jwtStrategyAuth");
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = require("./lib/passport-jwt");
const passport_local_1 = require("./lib/passport-local");
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:3000",
        "https://login-test-front.vercel.app/"
    ],
    credentials: true
}));
passport_1.default.use(passport_jwt_1.jwtStrategy); // passo 6 jwt
passport_1.default.use(passport_local_1.localStrategy);
app.use(passport_1.default.initialize());
app.use("/public", public_routes_1.default);
app.use("/private", jwtStrategyAuth_1.jwtStrategyAuth, private_routes_1.default); // colocar jwtMiddleware aqui 
// rotas adimin
app.use((req, res) => {
    res.status(404).json({
        error: 'Rota não encontrada',
        path: req.originalUrl,
        method: req.method
    });
});
exports.default = app;
