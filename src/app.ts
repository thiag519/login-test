import testeRoutes from  './routes/teste.routes';
import publicRoutes from  './routes/public.routes';
import privateRoutes from  './routes/private.routes';


import express from 'express'


const app = express();
app.use(express.json())

app.use("/test", testeRoutes);

// rotas  publicas
app.use("/public", publicRoutes);
// rotas de admin
app.use("/private", privateRoutes);


export default app;