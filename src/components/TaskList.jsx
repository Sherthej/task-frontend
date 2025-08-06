import React from "react";
import axios from "axios";
import { BASE_URL } from "../config";

function TaskList({ tasks, setTasks }) {
    // Defensive: If tasks is not an array, return early
    if (!Array.isArray(tasks)) {
        console.error("Expected 'tasks' to be an array but got:", tasks);
        return <p>⚠️ Error loading tasks. Please try again later.</p>;
    }
    const fetchTasks = async () => {
    try {
        const res = await axios.get(BASE_URL);
        console.log("Tasks from backend:", res.data);  // 👈 log the response
        setTasks(res.data);
    } catch (err) {
        console.error("Error fetching tasks:", err);  // 👈 see error details
    }
};


    const toggleComplete = async (id, currentStatus) => {
        try {
            const res = await axios.put(`${BASE_URL}/${id}`, { completed: !currentStatus });
            setTasks(prev =>
                prev.map(task => (task._id === id ? res.data : task))
            );
        } catch (err) {
            console.error("Failed to toggle completion:", err);
        }
    };

    const deleteTask = async id => {
        try {
            await axios.delete(`${BASE_URL}/${id}`);
            setTasks(prev => prev.filter(task => task._id !== id));
        } catch (err) {
            console.error("Failed to delete task:", err);
        }
    };

    return (
        <ul>
            {tasks.length === 0 ? (
                <p>No tasks found.</p>
            ) : (
                tasks.map(task => (
                    <li key={task._id} style={{ marginBottom: "15px" }}>
                        <strong>{task.title}</strong> - {task.description}
                        <br />
                        Due: {task.dueDate?.substring(0, 10)} | Status: {task.completed ? "✅ Done" : "⏳ Pending"}
                        <br />
                        <button onClick={() => toggleComplete(task._id, task.completed)}>
                            {task.completed ? "Undo" : "Complete"}
                        </button>
                        <button onClick={() => deleteTask(task._id)} style={{ marginLeft: "10px" }}>
                            Delete
                        </button>
                        <hr />
                    </li>
                ))
            )}
        </ul>
    );
}

export default TaskList;
