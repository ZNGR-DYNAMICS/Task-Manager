import { useEffect, useState } from 'react';
import { Task } from '../types/Task';
import Milestone from '../components/Milestone';
import Backlog from '../components/Tasks/Containers/Backlog';
import InProgress from '../components/Tasks/Containers/InProgress';
import Committed from '../components/Tasks/Containers/Committed';
import OnHold from '../components/Tasks/Containers/OnHold';

/**
 * Provides the TaskView component view, rendered under the `/task` route.
 * 
 * @returns TaskView component
 */
const TaskView: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const response = await fetch('http://localhost:8000/tasks.php');
        const data = await response.json();
        setTasks(data);
    };

    const addTask = async (newTask: Partial<Task>) => {
        const createdTask = {
            ...newTask,
            id: crypto.randomUUID(),
            dateCreated: new Date().toISOString().split('T')[0],
        } as Task;

        setTasks(prev => [...prev, createdTask]);
    
        fetch('http://localhost:8000/tasks.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(createdTask),
        }).catch(error => {
            console.error("Failed to save task to server", error);
        });
    };
    
    const updateTask = async (updatedTask: Task) => {
        setTasks(prev => {
            let updatedTasks = [...prev];

            const currentInProgressTask = updatedTasks.find(task => task.status === 'InProgress');

            if (updatedTask.status === 'InProgress') {
                if (currentInProgressTask) {
                    if (currentInProgressTask.id === updatedTask.id) {
                        // Same task is already InProgress -> move it back to Backlog
                        updatedTask = { ...updatedTask, status: 'Backlog' };
                    } else {
                        // Another task is in progress -> move it back to Backlog
                        updatedTasks = updatedTasks.map(task => 
                            task.id === currentInProgressTask.id 
                                ? { ...task, status: 'Backlog' } 
                                : task
                        );

                        fetch('http://localhost:8000/tasks.php', {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ ...currentInProgressTask, status: 'Backlog' }),
                        }).catch(error => {
                            console.error('Failed to update previous InProgress task on server', error);
                        });
                    }
                }
            }

            updatedTasks = updatedTasks.map(task =>
                task.id === updatedTask.id ? updatedTask : task
            );

            return updatedTasks;
        })

        fetch('http://localhost:8000/tasks.php', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedTask),
        }).catch(err => {
            console.error("Failed to update task on server", err);
        });
    };
    
    const getTasksByStatus = (status: Task["status"]) =>
        tasks.filter((task) => task.status === status);

    const handleUpdateTaskStatus = (task: Task, newStatus: Task['status']) => {
        const updatedTask = { ...task, status: newStatus };
        updateTask(updatedTask);
    };

    const handleAddTask = (newTask: Partial<Task>) => {
        addTask(newTask);
    };

    return (
        <div className='flex flex-col w-screen h-screen bg-black p-8 text-white overflow-hidden'>
            <div className='flex flex-row justify-between gap-8 mb-8'>
                <div className='min-w-[320px]'>
                    <h1 className='text-lg font-medium'>Task View</h1>
                </div>
                <Milestone />
                <OnHold
                    tasks={getTasksByStatus("OnHold")}
                    onDrop={(task: Task) => handleUpdateTaskStatus(task, "OnHold")}
                />
            </div>
            <div className='flex flex-row h-full gap-8'>
            <Backlog
                    tasks={getTasksByStatus("Backlog")}
                    onDrop={(task: Task) => handleUpdateTaskStatus(task, "Backlog")}
                    onAddTask={handleAddTask}
                />
                <InProgress 
                    task={getTasksByStatus("InProgress")[0] || null} 
                    onDrop={(task: Task) => handleUpdateTaskStatus(task, "InProgress")} 
                />
                <Committed 
                    tasks={getTasksByStatus("Committed")} 
                    onDrop={(task: Task) => handleUpdateTaskStatus(task, "Committed")}
                />
            </div>
        </div>
    );
};

export default TaskView;