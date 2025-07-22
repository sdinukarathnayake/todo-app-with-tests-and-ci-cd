import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'

const app = express()
app.use(express.json)

const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI

async function start() {
    try {
        await mongoose.connect(MONGO_URI)
        console.error('Connected to MongoDB..')

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`)  
        })

    } catch (err) {
        console.error('MongoDB connection error:', err)
        process.exit(1)
    }
}

start()