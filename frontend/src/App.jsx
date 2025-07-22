import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import TodoList from './pages/TodoList'
import AddTask from './pages/AddTask'
import './App.css'

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<TodoList />} />
                <Route path="/add" element={<AddTask />} />
            </Routes>
        </Router>
    )
}