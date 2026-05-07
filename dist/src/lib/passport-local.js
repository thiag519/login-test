"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.localStrategy = void 0;
const passport_local_1 = require("passport-local");
const public_model_1 = require("../models/public.model");
const user_service_1 = require("../services/user.service");
exports.localStrategy = new passport_local_1.Strategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        const user = await (0, public_model_1.findUserEmailPasswordModal)(email, password);
        if (!user) {
            return done(null, false);
        }
        const token = (0, user_service_1.createUserTokenService)(user); // passo 5 jwt
        /*const response: LocalStrategyResponse = {
          auth:{token}, user
        }*/
        return done(null, { user, auth: { token } });
    }
    catch (err) {
        console.error('Erro na estratégia local:', err);
        return done(null, false);
    }
});
