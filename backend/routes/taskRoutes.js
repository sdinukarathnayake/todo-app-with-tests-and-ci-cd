import express from 'express'
import { createTask, viewAllTasks, deleteTask } from '../controllers/taskController.js'

const router = express.Router()

router.post('/', createTask)
router.get('/', viewAllTasks)
router.delete('/:taskid', deleteTask)

export default router