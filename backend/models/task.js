import mongoose from 'mongoose'
const { Schema, model } = mongoose

const taskSchema = new Schema({
    taskname: {
        type: String,
        required: true,
        trim: true
    }
})

const Task = model('Task', taskSchema)
export default Task