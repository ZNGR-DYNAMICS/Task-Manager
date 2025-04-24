import { useRef } from "react";
import { useDrop } from "react-dnd";
import type { Task } from "../../../types/Task";

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
            <header className='flex justify-between p-2 border-b border-white-10'>
                <h2 className='text-base font-medium'>In Progress</h2>
                <h2 className='text-base font-medium'>Assigned User</h2>
            </header>
            <main className="flex-1 flex items-center justify-center p-8">
                <div className="w-full h-full flex items-center justify-center">
                    {task ? (
                        <div className="space-y-2">
                        <div className="font-semibold">{task.title}</div>
                        {task.description && <div>{task.description}</div>}
                        {task.assignee && <div><strong>Assignee:</strong> {task.assignee}</div>}
                        {task.dueDate && <div><strong>Due:</strong> {task.dueDate}</div>}
                        {task.taskSize && <div><strong>Size:</strong> {task.taskSize}</div>}
                        <div className="inline-block px-3 py-1 mt-2 bg-blue-200 text-blue-900 border border-blue-400 rounded text-sm">
                            Move this task
                        </div>
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