import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt"
import { findUserByIdModel } from "../models/private.model";


//passo 1 jwt
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_KEY as string
}

export const jwtStrategy = new JwtStrategy( options, async (payload, done) => {
  console.log("Payload  em jwtStrategy: ",payload);

  const {id} = payload;
  const user = await findUserByIdModel(id);
  if(!user) {
    return done(null, false);
  }
  return done(null, user);
})