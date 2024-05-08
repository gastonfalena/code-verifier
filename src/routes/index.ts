/**
 * Root Router
 * Redirections to Routers
 */

import express, { Request, Response } from 'express'
import helloRouter from './HelloRouter'
import { LogInfo } from '../utils/logger'
import userRouter from './UserRouter'
import authRouter from './AuthRouter'

//Server instance
let server = express()

//Router instance
let rootRouter = express.Router()

// Activatge for requests to http://localhost:8000/api

rootRouter.get('/', (req: Request, res: Response) => {
  LogInfo('GET: http://localhost:8000/api')
  //Send Hello world
  res.send('Welcome to my API')
})

//Redirections to Routers & Controllers

server.use('/', rootRouter) //http://localhost:8000/api
server.use('/hello', helloRouter) //http://localhost:8000/api/hello
server.use('/users', userRouter) //http://localhost:8000/api/users ---> UserRouter
//Auth router
server.use('/auth', authRouter) //http://localhost:8000/api/auth ---> AuthRouter
//Add more routes to the app
export default server
