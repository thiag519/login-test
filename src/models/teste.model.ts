import { UrlWithStringQuery } from "url";
import { getTestPingPong } from "../controllers/teste.controller"
import { ParsedUrlQuery } from "querystring";

const pingt = 'pong'

export const getTestPingModel = () => {

  if(pingt == 'pong') {
    return pingt
  }
  return null
}