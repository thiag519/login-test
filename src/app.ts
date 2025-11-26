import testeRoutes from  './routes/teste.routes';
import publicRoutes from  './routes/public.routes';
import privateRoutes from  './routes/private.routes';


import express from 'express'
import { jwtStrategyAuth } from './middlewares/jwtStrategyAuth';


const app = express();
app.use(express.json())

app.use("/test", testeRoutes);

// rotas  publicas
app.use("/public", publicRoutes);
// rotas privadas
app.use("/private",jwtStrategyAuth, privateRoutes);// colocar jwtMiddleware aqui 
// rotas adimin




export default app;