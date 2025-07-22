// __tests__/taskController.test.js

import { jest } from '@jest/globals'
import * as taskController from '../controllers/taskController.js'
import Task from '../models/task.js'

// mock the entire Task model
jest.mock('../models/task.js')

describe('Task Controller (unit tests)', () => {
    let req, res

    beforeEach(() => {
        jest.clearAllMocks()
        req = {}
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
    })

    describe('viewAllTasks', () => {
        it('responds with JSON array on success', async () => {
            const fakeTasks = [{ _id: '1', taskname: 'A' }]
            Task.find.mockResolvedValue(fakeTasks)

            await taskController.viewAllTasks(req, res)

            expect(Task.find).toHaveBeenCalledWith({})
            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith(fakeTasks)
        })

        it('sends 500 on error', async () => {
            Task.find.mockRejectedValue(new Error('DB fail'))

            await taskController.viewAllTasks(req, res)

            expect(res.status).toHaveBeenCalledWith(500)
            expect(res.json).toHaveBeenCalledWith({ error: 'Server error..' })
        })
    })

    describe('createTask', () => {
        beforeEach(() => {
            req = { body: { taskname: 'New Task' } }
        })

        it('creates a task and returns 201', async () => {
            // Mock Task instance and its save() method
            const mockSave = jest.fn().mockResolvedValue()
            Task.mockImplementation(({ taskname }) => {
                const inst = { taskname, save: mockSave }
                inst._id = '2'
                return inst
            })

            await taskController.createTask(req, res)

            expect(Task).toHaveBeenCalledWith({ taskname: 'New Task' })
            expect(mockSave).toHaveBeenCalled()
            expect(res.status).toHaveBeenCalledWith(201)
            expect(res.json).toHaveBeenCalledWith({
                message: 'Task successfuly added..',
                task: { taskId: '2', taskName: 'New Task' }
            })
        })

        it('sends 500 on save error', async () => {
            // Mock save() to reject
            Task.mockImplementation(() => ({
                save: jest.fn().mockRejectedValue(new Error('Save fail'))
            }))

            await taskController.createTask(req, res)

            expect(res.status).toHaveBeenCalledWith(500)
            expect(res.json).toHaveBeenCalledWith({ error: 'Server error..' })
        })
    })

    describe('deleteTask', () => {
        beforeEach(() => {
            req = { params: { taskid: '123' } }
        })

        it('deletes the task and returns 200', async () => {
            Task.findByIdAndDelete.mockResolvedValue(true)

            await taskController.deleteTask(req, res)

            expect(Task.findByIdAndDelete).toHaveBeenCalledWith('123')
            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith({ message: 'Task successfuly deleted' })
        })

        it('sends 500 on error', async () => {
            Task.findByIdAndDelete.mockRejectedValue(new Error('Bad ID'))

            await taskController.deleteTask(req, res)

            expect(res.status).toHaveBeenCalledWith(500)
            expect(res.json).toHaveBeenCalledWith({ error: 'Server error..' })
        })
    })
})