import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import 'dotenv/config'

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI

// route links
import taskRoutes from './routes/taskRoutes.js'
app.use('/tasks', taskRoutes)

async function start() {
    try {
        await mongoose.connect(MONGO_URI)
        console.log('Connected to MongoDB..')

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`)  
        })

    } catch (err) {
        console.error('MongoDB connection error:', err)
        process.exit(1)
    }
}

start()