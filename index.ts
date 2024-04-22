import express, { type Express, type Request, type Response } from 'express'
import dotenv from 'dotenv'
import server from '@/server'
import { LogError, LogSuccess } from '@/utils/logger'

// Configuration the .env file
dotenv.config()

const port = process.env.PORT || 8000

// Execute SERVER

server.listen(port, () => {
  LogSuccess(`[SERVER ON] : Running in htpp://localhost:8000/api`)
})

// Control SERVER ERROR

server.on('error', (error) => {
  LogError(`[SERVER ON] : ${error}`)
})
