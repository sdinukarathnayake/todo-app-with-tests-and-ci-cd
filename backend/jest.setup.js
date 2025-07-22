/* for integration tests

    beforeAll: start the in‑memory server, connect Mongoose

    afterEach: wipe the DB so tests don’t bleed data

    afterAll: cleanly shut everything down
*/


import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server-core'

let mongoServer

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    const uri = mongoServer.getUri()
    await mongoose.connect(uri)
})

afterEach(async () => {
    // clear all data between tests
    await mongoose.connection.db.dropDatabase()
})

afterAll(async () => {
    await mongoose.disconnect()
    await mongoServer.stop()
})