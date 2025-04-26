import { useRef } from "react";
import { useDrop } from "react-dnd";
import { CircleCheck } from "lucide-react";
import TaskItem from "../TaskItem";
import { Task } from "../../../types/Task";

interface CommittedProps {
    tasks: Task[];
    onDrop: (task: Task) => void;
}

const Committed: React.FC<CommittedProps> = ({ tasks, onDrop }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [, drop] = useDrop(() => ({
        accept: "Task",
        drop: (item: Task) => {
            if (item.status !== "Committed") onDrop(item);
        },
    }), [onDrop]);

    drop(ref);

    return (
        <div ref={ref} className='min-w-[320px] bg-white-5 border border-white-10 rounded-lg'>
            <header className='h-12 flex px-4 py-2 border-b border-white-10 select-none'>
                <div className='flex justify-center items-center gap-2'>
                    <CircleCheck size='16px' />
                    <h2 className='font-base font-medium'>Committed</h2>
                </div>
            </header>
            <main className="p-2">
                {tasks.map((task) => (
                    <TaskItem key={task.id} task={task} />
                ))}
            </main>
        </div>
    )
};

export default Committed;