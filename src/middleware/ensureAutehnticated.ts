import {Request, Response, NextFunction} from 'express'
import { verify } from "jsonwebtoken"

interface IPaylod {
  sub: string
}

export function ensureAutheticated(req: Request, res: Response, next: NextFunction) {
  const authToken = req.headers.authorization

  if(!authToken) {
    return res.status(401).json({
      errorCode: 'token.invalid'
    })
  }

  const token = authToken.split('')[1]

  try{
    const { sub } = verify(token, process.env.JWT_SECRET) as IPaylod

    req. user_id = sub

    return next()

  }catch(err) {
    return res.status(401).json({
      errorCode: 'token.expired'
    })
  }

  
}