/**
 * Root Router
 * Redirections to Routers
 */

import express, { Request, Response } from 'express'
import helloRouter from './HelloRouter'
import { LogInfo } from '@/utils/logger'

//Server instance
let server = express()

//Router instance
let rootRouter = express.Router()

// Activatge for requests to http://localhost:8000/api

rootRouter.get('/', (req: Request, res: Response) => {
  //Send Hello world
  res.send('Welcome to my API')
})

//Redirections to Routers & Controllers

server.use('/', rootRouter) //http://localhost:8000/api
server.use('/hello', helloRouter) //http://localhost:8000/api/hello
