import Task from '../models/task.js'

export const createTask = async (req, res) => {
    try {
        const { taskname } = req.body
        const newTask = new Task({ taskname })

        await newTask.save()
        res.status(201).json({
            message: 'Task successfuly added..',
            task: {
                taskId: newTask._id,
                taskName: newTask.taskname
            }
        })

    } catch (err) {
        res.status(500).json({ error: 'Server error..' })
    }
}


export const viewAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.status(200).json( tasks )

    } catch (err) {
        res.status(500).json({ error: 'Server error..' })
    }
}


export const deleteTask = async (req, res) => {
    try {
        const deletetaskid = req.params.taskid
        await Task.findByIdAndDelete( deletetaskid )
        res.status(200).json({ message: 'Task successfuly deleted' });

    } catch (err) {
        res.status(500).json({ error: 'Server error..' })
    }
}