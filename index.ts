import express, { type Express, type Request, type Response } from 'express'
import dotenv from 'dotenv'

// Configuration the .env file

dotenv.config()

// Create Express APP

const app: Express = express()
const port = process.env.PORT || 8000

// Define the first Route of APP
app.get('/', (req: Request, res: Response) => {
  res.send('APP Express + TS')
})

// Execute APP and Listen Ruequest to PORT
app.listen(port, () => {
  console.log('EXPRESS SERVER: Running at http://localhost:8000')
})
