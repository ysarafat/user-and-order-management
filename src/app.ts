import cors from 'cors'
import express, { Application } from 'express'
const app: Application = express()

// default middlewares
app.use(express.json())
app.use(cors())

//
export default app
