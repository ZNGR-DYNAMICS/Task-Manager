import { useRef } from "react";
import { useDrop } from "react-dnd";
import { Plus, Circle } from "lucide-react";
import TaskItem from "../TaskItem";
import { Task } from "../../../types/Task";

interface BacklogProps {
    tasks: Task[];
    onDrop: (task: Task) => void;
}

const Backlog: React.FC<BacklogProps> = ({ tasks, onDrop }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [, drop] = useDrop(() => ({
        accept: "Task",
        drop: (item: Task) => {
            if (item.status !== "Backlog") onDrop(item);
        },
    }), [onDrop]);

    function handleAddTask() {
        console.log('Add Task button clicked');
    }

    drop(ref);

    return (
        <div ref={ref} className='min-w-[320px] bg-white-5 border border-white-10 rounded-lg'>
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
                {tasks.map((task) => (
                    <TaskItem key={task.id} task={task} />
                ))}
            </main>
        </div>
    )
}

export default Backlog;