import { Request, Response } from "express"
import { getTestPingModel } from "../model/teste.model";


export const getTestPingPong = async (req: Request, res:Response) => {

  const response = await getTestPingModel();

  if(response) {
    res.json({message: 'Teve o ping', response})
  }
  return res.status(401).json({error: 'Não a ping'})
}