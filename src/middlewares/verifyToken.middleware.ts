import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
/**
 *
 * @param {Request} Original request previous middleware of verification JWT
 * @param {Response} response to verification of jwt
 * @param {nextFunction} next function to be executed
 * @returns errors of verification or next execution
 */
export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //Check HEADER from Request for 'x-access-token'
  let token: any = req.headers['x-access-token']

  // Verify if jwt is present
  if (!token) {
    return res.status(403).send({
      authentication: 'Missing JWT in request',
      message: 'Not authorised to consume this endpoint',
    })
  }
  //Verify the token obtained
  jwt.verify(token, '', (err: any, decoded: any) => {
    if (err) {
      return res.status(500).send({
        authentication: 'JWT Verification failed',
        message: 'Failed to verify JWT token in request',
      })
    }
    // IF JWT is OK
    //Execute next function -> protected routes will be executed
    next()
  })
}
