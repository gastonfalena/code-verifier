import express, { Request, Response } from 'express'
import { LogInfo } from '../utils/logger'
import bcrypt from 'bcrypt'
import { IUser } from '../domain/interfaces/IUser.interface'
import { AuthController } from '../controller/AuthController'
import { IAuth } from '../domain/interfaces/IAuth.interface'

let authRouter = express.Router()
authRouter.route('/auth/register').post(async (req: Request, res: Response) => {
  let { name, email, password, age } = req.body
  let hashedPassword = ''
  if (name && password && email && age) {
    // Obtain the password in request and cypher
    hashedPassword = bcrypt.hashSync(password, 8)
    let user: IUser = {
      name,
      email,
      password: hashedPassword,
      age,
    }
    const controller: AuthController = new AuthController()
    // Obtain response
    const response = await controller.registerUser(user)
    // send to the client the response
    return res.status(200).send(response)
  }
})
authRouter.route('/auth/login').post(async (req: Request, res: Response) => {
  let { email, password } = req.body
  if (password && email) {
    const controller: AuthController = new AuthController()
    let auth: IAuth = {
      email,
      password,
    }
    // Obtain response
    const response = await controller.loginUser(auth)
    // send to the client the response
    return res.status(200).send(response)
  }
})

export default authRouter
