import { useState, useRef } from 'react';
import { Plus, Circle } from 'lucide-react';
import { Task } from '../types/Task';
import Milestone from '../components/Milestone';
import TaskItem from '../components/Tasks/TaskItem';
import InProgress from '../components/Tasks/Containers/InProgress';
import { useDrop } from 'react-dnd';


/**
 * Provides the TaskView component view, rendered under the `/task` route.
 * 
 * @returns TaskView component
 */
const TaskView: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([
        { id: "1", title: "Task 1", status: "Backlog", type: "Task" },
        { id: "2", title: "Task 2", status: "Backlog", type: "Task" },
        { id: "3", title: "Task 3", status: "OnHold", type: "Task" },
        { id: "4", title: "Task 4", status: "Cancelled", type: "Task" },
        { id: "5", title: "Task 5", status: "Released", type: "Task" },
    ]);

    const getTasksByStatus = (status: Task["status"]) =>
        tasks.filter((task) => task.status === status);

    function handleAddTask() {
        console.log('Add Task button clicked');
    }

    const handleUpdateTaskStatus = (task: Task, newStatus: Task["status"]) => {
        setTasks((prev) =>
            prev.map((t) =>
                t.id === task.id ? { ...t, status: newStatus } :
                t.status === newStatus && newStatus === "InProgress" ? { ...t, status: "Backlog" } :
                t
            )
        );
    };
    
    const backlogRef = useRef<HTMLDivElement>(null);
    const [, dropBacklog] = useDrop(() => ({
        accept: "Task",
        drop: (item: Task) => handleUpdateTaskStatus(item, "Backlog"),
    }), []);

    dropBacklog(backlogRef);

    return (
        <div className='flex flex-col w-screen h-screen bg-black p-8 text-white'>
            <div className='flex flex-row justify-between mb-4'>
                <h1 className='text-lg font-semibold'>Task View</h1>
                <Milestone />
            </div>
            <div className='flex flex-row h-full gap-8'>
                <div ref={backlogRef} className='min-w-[320px] bg-white-5 border border-white-10 rounded-lg'>
                    <header className='flex justify-between p-2 border-b border-white-10'>
                        <div className='flex gap-2'>
                            <div className='flex justify-center items-center'>
                                <Circle size='16px' />
                            </div>
                            <h2 className='font-base font-medium'>Backlog</h2>
                        </div>
                        <button
                            className=' border border-white-25 rounded-md p-1 text-white cursor-pointer'
                            onClick={handleAddTask}
                        >
                            <Plus size='16px' />
                        </button>
                    </header>
                    <main className='p-2'>
                        {getTasksByStatus("Backlog").map((task) => (
                            <TaskItem key={task.id} task={task} />
                        ))}
                    </main>
                </div>
                <InProgress 
                    task={getTasksByStatus("InProgress")[0] || null} 
                    onDrop={(task: Task) => handleUpdateTaskStatus(task, "InProgress")} 
                />
                <div className='min-w-[320px] bg-white-5 border border-white-10 rounded-lg'>
                    <header className='flex justify-between p-2 border-b border-white-10'>
                        <h2 className='text-base font-medium'>Committed</h2>
                    </header>
                </div>
            </div>
        </div>
    );
};

export default TaskView;