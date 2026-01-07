import publicRoutes from  './routes/public.routes';
import privateRoutes from  './routes/private.routes';
import cors from 'cors';


import express from 'express'
import { jwtStrategyAuth } from './middlewares/jwtStrategyAuth';
import passport from 'passport';
import { jwtStrategy } from './lib/passport-jwt';
import { localStrategy } from './lib/passport-local';


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors())

passport.use(jwtStrategy);// passo 6 jwt
passport.use(localStrategy);
app.use(passport.initialize());


app.use("/public", publicRoutes);
app.use("/private",jwtStrategyAuth, privateRoutes);// colocar jwtMiddleware aqui 
// rotas adimin




export default app;