"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtStrategy = void 0;
const passport_jwt_1 = require("passport-jwt");
const private_model_1 = require("../models/private.model");
//passo 1 jwt
const options = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_KEY
};
exports.jwtStrategy = new passport_jwt_1.Strategy(options, async (payload, done) => {
    const { id } = payload;
    const user = await (0, private_model_1.findUserByIdModel)(id);
    if (!user) {
        return done(null, false);
    }
    return done(null, user);
});
