import { useRef } from "react";
import { useDrop, useDrag } from "react-dnd";
import type { Task } from "../../../types/Task";

type InProgressProps = {
    task: Task | null;
    onDrop: (task: Task) => void;
};

const InProgressDraggable: React.FC<{ task: Task }> = ({ task }) => {
    const moveRef = useRef<HTMLDivElement>(null);
    const [{ isDragging }, drag] = useDrag(() => ({
        type: task.type,
        item: { ...task },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }), [task]);

    drag(moveRef);

    return (
        <div
            ref={moveRef}
            className={`inline-block p-2 mt-4 bg-blue-100 text-blue-800 border border-blue-400 rounded cursor-move text-sm ${
                isDragging ? "opacity-60" : "opacity-100"
            }`}
        >
            Move Task
        </div>
    );
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
                { task ? (
                    <>
                        <InProgressDraggable task={task} />
                        <h2 className='text-base font-medium'>{task.assignee}</h2>
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