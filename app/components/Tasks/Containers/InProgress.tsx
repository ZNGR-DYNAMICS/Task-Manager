import { useRef } from "react";
import { useDrop } from "react-dnd";
import type { Task } from "../../../types/Task";
import TaskItem from "../TaskItem";
import { CirclePlay } from "lucide-react";

type InProgressProps = {
    task: Task | null;
    onDrop: (task: Task) => void;
};

const InProgress: React.FC<InProgressProps> = ({ task, onDrop }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [, drop] = useDrop(() => ({
        accept: "Task",
        drop: (item: Task) => {
            if (item.status !== "InProgress") onDrop(item);
        },
    }), [onDrop]);

    drop(ref);

    return (
        <div
            ref={ref}
            className='w-full bg-white-5 border border-white-10 rounded-lg flex-grow overflow-y-auto'
        >
            <header className='h-12 flex justify-between items-center px-4 gap-4 border-b border-white-10 text-nowrap'>
                <div className="flex justify-center items-center gap-2">
                    <CirclePlay size='16px' />
                    <h2 className='text-base font-medium'>In Progress</h2>
                </div>
                { task ? (
                    <>
                        <div className="w-80">
                            <TaskItem task={task} />
                        </div>
                        <h2 className='ml-auto text-base font-medium'>{task.assignee}</h2>
                    </>
                ) : (
                    <h2 className='text-base font-medium'>Assigned User</h2>
                )}
            </header>
            <main className="flex-1 flex items-center justify-center p-8">
                <div className="w-full h-full flex items-center justify-center">
                    {task ? (
                        <div className="space-y-2 text-white">
                            <p className="font-semibold">{task.title}</p>
                            {task.description && <p>{task.description}</p>}
                            {task.dateDue && <p><strong>Due:</strong> {task.dateDue}</p>}
                            {task.taskSize && <p><strong>Size:</strong> {task.taskSize}</p>}
                        </div>
                    ) : (
                        <p className="text-white-50">
                            Drag & Drop to view task.
                        </p>
                    )}
                </div>
            </main>
        </div>
    )
}

export default InProgress;