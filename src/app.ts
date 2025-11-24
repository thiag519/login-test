import testeRoutes from  './routes/teste.routes';
import usersRoutes from  './routes/users.routes';

import express from 'express'


const app = express();
app.use(express.json())

app.use("/test", testeRoutes)
// rotas  publicas

app.use("/public", usersRoutes)
// rotas de admin
// rotas privadas

export default app;