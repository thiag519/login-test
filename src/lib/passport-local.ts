import {Strategy as LocalStrategy} from 'passport-local'
import { findUserEmailPasswordModal } from '../models/public.model'
import { createUserTokenService } from '../services/user.service';
import { LocalStrategyResponse } from '../types/localStrategyResponse';

export const localStrategy = new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {

  try {
    const user = await findUserEmailPasswordModal(email, password);

    if(!user){
      return done(null, false);
    }
    const token = createUserTokenService(user);// passo 5 jwt

    /*const response: LocalStrategyResponse = {
      auth:{token}, user
    }*/
    return done(null, {user, auth:{token}});

  } catch (err) {
    console.error('Erro na estratégia local:', err);
    return done(null, false);
  }
});