import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rootRout from '../routes'
import swaggerUi from 'swagger-ui-express'
import mongoose from 'mongoose'

// TODO: HTTPS

// Create Express APP
const server: Express = express()

//Define SERVER to use "/api" and  use rootRouter from 'index.ts' in routes
//From this points onover: htpp://localhost:8000/api/...
server.use('/api', rootRout)
// Static server
server.use(express.static('public'))

// TODO: Mongoose Connection
mongoose.connect('mongodb://127.0.0.1:27017/codeverification')
//Swagger
server.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: '/swagger.json',
      explorer: true,
    },
  })
)

//Security Config
server.use(helmet())
server.use(cors())

// Content Type Config
server.use(express.urlencoded({ extended: true, limit: '50mb' }))
server.use(express.json({ limit: '50mb' }))
// Redirection Config
// http:localhost:8000/ ---> http:localhost:8000/api/
server.get('/', (req: Request, res: Response) => {
  res.redirect('/api')
})

export default server
