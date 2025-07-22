import request from 'supertest'
import app from '../app.js'

describe('Tasks API (integration)', () => {
    it('GET /tasks → empty array', async () => {
        const res = await request(app).get('/tasks/')
        expect(res.status).toBe(200)
        expect(res.body).toEqual([])
    })

    it('POST /tasks → 201 & created task', async () => {
        const res = await request(app)
            .post('/tasks/')
            .send({ taskname: 'Integration Test' })

        expect(res.status).toBe(201)
        expect(res.body).toHaveProperty('message', 'Task successfuly added..')
        expect(res.body).toHaveProperty('task')

        expect(res.body.task).toMatchObject({
            taskName: 'Integration Test'
        })
        expect(typeof res.body.task.taskId).toBe('string')
    })

    it('DELETE /tasks/:id → 200 & message', async () => {
        // create one
        const createRes = await request(app)
            .post('/tasks/')
            .send({ taskname: 'To be deleted' })

        // grab the dynamic ID
        const id = createRes.body.task.taskId

        // delete it
        const delRes = await request(app).delete(`/tasks/${id}`)
        expect(delRes.status).toBe(200)
        expect(delRes.body).toEqual({ message: 'Task successfuly deleted' })

        const getRes = await request(app).get('/tasks/')
        expect(getRes.body).toHaveLength(0)
    })
})