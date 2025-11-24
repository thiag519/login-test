import { UrlWithStringQuery } from "url";
import { getTestPingPong } from "../controllers/teste.controller"
import { ParsedUrlQuery } from "querystring";

const pingt = 'pong'

export const getTestPingModel  = (ping:string) => {
  ping = pingt
  if(pingt == 'pong') {
    return pingt
  }
  return null
}