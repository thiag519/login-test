import {Strategy as LocalStrategy} from 'passport-local'
import { findUserEmailPasswordModal } from '../models/public.model'
import { createUserTokenService } from '../services/user.service';
import { LocalStrategyResponse } from '../types/localStrategyResponse';

export const localStrategy = new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  const user = await findUserEmailPasswordModal(email, password);

  if(!user){
    return done(null, false);
  } else {
    const token = createUserTokenService(user);// passo 5 jwt
    const response: LocalStrategyResponse = {
      auth:{token}, user
    };
    console.log("Resposta do lacalStrategy: ", response);
    return done(null, response);
  }
})