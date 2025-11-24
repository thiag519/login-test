import dotenv from "dotenv";
import express from 'express';
import app from "./app";

dotenv.config();
const server = express();

//server.use('/', router);


const PORT = process.env.PORT || 3001
app.listen(PORT, ()=> {
  console.log( `Servidor esta rodando em http://localhost:${PORT}`);
})