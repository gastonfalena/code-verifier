import express, { type Express, type Request, type Response } from 'express'
import dotenv from 'dotenv'

// Configuration the .env file

dotenv.config()

// Create Express APP

const app: Express = express()
const port = process.env.PORT || 8000

// Execute APP and Listen Ruequest to PORT
app.listen(port, () => {
  console.log('EXPRESS SERVER: Running at http://localhost:8000')
})
