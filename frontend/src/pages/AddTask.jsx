// src/pages/AddTask.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const BASE_URL = 'http://localhost:5000'

export default function AddTask() {
    const [taskName, setTaskName] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        if (!taskName.trim()) {
            setError('Task name cannot be empty')
            return
        }
        try {
            const res = await fetch(`${BASE_URL}/tasks/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ taskname: taskName })
            })
            if (!res.ok) throw new Error('Create failed')
            navigate('/')
        } catch (err) {
            console.error('Error creating task:', err)
            setError('Could not create task')
        }
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow rounded">
            <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    value={taskName}
                    onChange={e => setTaskName(e.target.value)}
                    placeholder="Task name"
                    className="w-full p-2 border rounded"
                />
                <div className="flex justify-end space-x-2">
                    <button
                        type="button"
                        onClick={() => navigate('/')}
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                        Save Task
                    </button>
                </div>
            </form>
        </div>
    )
}