import { User } from "../../generated/prisma/client";
import jwt, { TokenExpiredError } from 'jsonwebtoken';


// passo 4 jwt
export const createUserTokenService = (user: User) => {
  const payload = {id: user.id};
  console.log(payload);
  const secret = process.env.JWT_KEY;
  if(!secret) throw new Error("JWT_KEY not defined");
  return jwt.sign(payload, secret, {algorithm: 'HS256', expiresIn: '1h'});
};

// passo 2 refresh token: criar função que cria o refreshtoken na pasta services