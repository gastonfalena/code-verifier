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
