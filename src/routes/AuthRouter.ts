import express, { Request, Response } from 'express'
import { LogInfo } from '../utils/logger'
import bcrypt from 'bcrypt'
import { IUser } from '../domain/interfaces/IUser.interface'
import { AuthController } from '../controller/AuthController'
import { IAuth } from '../domain/interfaces/IAuth.interface'
import { verifyToken } from '../middlewares/verifyToken.middleware'
import bodyParser from 'body-parser'

//Body parseer (read json fro mbody in requests)
let jsonParser = bodyParser.json()
// Router form express
let authRouter = express.Router()
authRouter
  .route('/register')
  .post(jsonParser, async (req: Request, res: Response) => {
    let { name, email, password, age } = req?.body
    let hashedPassword = ''
    if (name && password && email && age) {
      // Obtain the password in request and cypher
      hashedPassword = bcrypt.hashSync(password, 8)
      let user: IUser = {
        name,
        email,
        password: hashedPassword,
        age,
        katas: [],
      }
      const controller: AuthController = new AuthController()
      // Obtain response
      const response = await controller.registerUser(user)
      // send to the client the response
      return res.status(200).send(response)
    } else {
      return res.status(400).send({
        message: '[ERROR User Data Missing]No user can be registered',
      })
    }
  })
authRouter
  .route('/login')
  .post(jsonParser, async (req: Request, res: Response) => {
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
    } else {
      return res.status(400).send({
        message: '[ERROR User Data Missing]No user can be registered',
      })
    }
  })
//Route Protected by Verify token middleware
authRouter
  .route('/me')
  .get(verifyToken, async (req: Request, res: Response) => {
    // Obtain the id of user
    let id: any = req?.query?.id
    if (id) {
      //Controller
      const controller: AuthController = new AuthController()
      //Obtain response from controller
      let response: any = await controller.userData(id)
      // If user is authorised:
      return res.status(200).send(response)
    } else {
      return res.status(401).send({
        message: 'You are not authorised',
      })
    }
  })
export default authRouter
