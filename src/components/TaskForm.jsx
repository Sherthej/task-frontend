import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config";

function TaskForm({ onTaskAdded }) {
    const [task, setTask] = useState({ title: "", description: "", dueDate: "" });

    const handleChange = e => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post(BASE_URL, task);
            onTaskAdded(res.data);
            setTask({ title: "", description: "", dueDate: "" });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="title" value={task.title} onChange={handleChange} placeholder="Title" required />
            <input name="description" value={task.description} onChange={handleChange} placeholder="Description" />
            <input type="date" name="dueDate" value={task.dueDate} onChange={handleChange} />
            <button type="submit">Add Task</button>
        </form>
    );
}

export default TaskForm;
