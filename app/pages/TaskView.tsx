import { Plus, Circle } from 'lucide-react';
import { Task } from '../types/Task';
import Milestone from '../components/Milestone';
import TaskItem from '../components/Tasks/TaskItem';

interface TaskViewProps {
    tasks: Task;
}

const initialTasks: Task[] = [
    { id: 'task-1', title: 'Setup Project Structure', description: 'Create folders, install dependencies.', assignee: 'Alice', dueDate: '2025-05-01', taskSize: 'Medium', files: ['diagram.png'], status: 'Backlog' },
    { id: 'task-2', title: 'Design UI Mockups', description: 'Create mockups for the main views.', assignee: 'Bob', dueDate: '2025-05-05', taskSize: 'Large', files: ['mockup1.fig', 'mockup2.fig'], status: 'Backlog' },
    { id: 'task-3', title: 'Implement Login Page', description: 'Build the user login form and logic.', assignee: 'Charlie', dueDate: '2025-05-10', taskSize: 'Medium', files: [], status: 'Backlog' },
]


/**
 * Provides the TaskView component view, rendered under the `/task` route.
 * 
 * @returns TaskView component
 */
const TaskView: React.FC<TaskViewProps> = ({ task }) => {

    function handleAddTask() {
        console.log('Add Task button clicked');
    }

    return (
        <div className='flex flex-col w-screen h-screen bg-black p-8 text-white'>
            <div className='flex flex-row justify-between mb-4'>
                <h1 className='text-lg font-semibold'>Task View</h1>
                <Milestone />
            </div>
            <div className='flex flex-row h-full gap-8'>
                <div className='min-w-[320px] bg-white-5 border border-white-10 rounded-lg'>
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
                        {tasks.map}
                        <TaskItem key={task.id} task={task} />
                    </main>
                </div>
                <div className='w-full bg-white-5 border border-white-10 rounded-lg flex-grow overflow-y-auto'>
                    <header className='flex justify-between p-2 border-b border-white-10'>
                        <h2 className='text-base font-medium'>In Progress</h2>
                        <h2 className='text-base font-medium'>Assigned User</h2>
                    </header>
                    <main className="flex-1 flex items-center justify-center p-8">
                        <div className="w-full h-full flex items-center justify-center">
                            <p className="text-white-50">
                                Drag & Drop to view task.
                            </p>
                        </div>
                    </main>
                </div>
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