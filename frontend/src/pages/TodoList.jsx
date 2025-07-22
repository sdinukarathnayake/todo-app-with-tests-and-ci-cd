import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const BASE_URL = 'http://localhost:5000'

export default function TodoList() {
    const [tasks, setTasks] = useState([])
    const navigate = useNavigate()

    const fetchTasks = async () => {
        try {
            const res = await fetch(`${BASE_URL}/tasks/`)
            if (!res.ok) throw new Error('Failed to load')
            const data = await res.json()
            setTasks(data)
        } catch (err) {
            console.error('Error fetching tasks:', err)
        }
    }

    useEffect(() => {
        fetchTasks()
    }, [])

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`${BASE_URL}/tasks/${id}`, { method: 'DELETE' })
            if (!res.ok) throw new Error('Delete failed')
            setTasks(prev => prev.filter(t => t._id !== id))
        } catch (err) {
            console.error('Error deleting task:', err)
        }
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow rounded">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold">My Todo List</h1>
                <button
                    onClick={() => navigate('/add')}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Add Task
                </button>
            </div>
            <ul className="space-y-2">
                {tasks.map(task => (
                    <li
                        key={task._id}
                        className="flex justify-between items-center p-2 border rounded"
                    >
                        <span>{task.taskname}</span>
                        <button
                            onClick={() => handleDelete(task._id)}
                            className="text-red-500 hover:text-red-700"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}