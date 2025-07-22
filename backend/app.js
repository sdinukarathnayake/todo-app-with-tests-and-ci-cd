import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import taskRoutes from './routes/taskRoutes.js'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/tasks', taskRoutes)

export default app