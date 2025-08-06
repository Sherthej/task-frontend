import React, { useEffect, useState } from "react";
import './App.css';
import axios from "axios";
import { BASE_URL } from "./config";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
        try {
            const res = await axios.get(BASE_URL);
            setTasks(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const addTask = task => {
        setTasks(prev => [task, ...prev]);
    };

    return (
        <div style={{ padding: "20px", maxWidth: "700px", margin: "auto" }}>
            <h1>📝 Task Manager</h1>
            <TaskForm onTaskAdded={addTask} />
            <TaskList tasks={tasks} setTasks={setTasks} />
        </div>
    );
}

export default App;
