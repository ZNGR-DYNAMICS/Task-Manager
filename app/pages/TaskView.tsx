import { useState } from 'react';
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
    const [tasks, setTasks] = useState<Task[]>([
        { id: "1", title: "Task 1", status: "Backlog", type: "Task", dateCreated: "2023-08-01", assignee: "User 1" },
        { id: "2", title: "Task 2", status: "Backlog", type: "Task", dateCreated: "2023-08-15", assignee: "User 2" },
        { id: "3", title: "Task 3", status: "Backlog", type: "Task", dateCreated: "2023-08-20", assignee: "User 3" },
        { id: "4", title: "Task 4", status: "Backlog", type: "Task", dateCreated: "2023-09-01", assignee: "User 4" },
        { id: "5", title: "Task 5", status: "Backlog", type: "Task", dateCreated: "2023-10-01", assignee: "User 5" },
    ]);

    const getTasksByStatus = (status: Task["status"]) =>
        tasks.filter((task) => task.status === status);

    const handleUpdateTaskStatus = (task: Task, newStatus: Task["status"]) => {
        setTasks((prev) =>
            prev.map((t) =>
                t.id === task.id ? { ...t, status: newStatus } :
                t.status === newStatus && newStatus === "InProgress" ? { ...t, status: "Backlog" } :
                t
            )
        );
    };

    return (
        <div className='flex flex-col w-screen h-screen bg-black p-8 text-white'>
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