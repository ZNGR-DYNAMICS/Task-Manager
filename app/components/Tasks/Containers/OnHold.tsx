import React, { useRef } from "react";
import { useDrop } from "react-dnd";
import { Pause } from "lucide-react";
import { Task } from "../../../types/Task";
import TaskItem from "../TaskItem";

interface OnHoldProps {
    tasks: Task[];
    onDrop: (task: Task) => void;
}

const OnHold: React.FC<OnHoldProps> = ({ tasks, onDrop }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [, drop] = useDrop(() => ({
        accept: "Task",
        drop: (item: Task) => {
            if (item.status !== "OnHold") onDrop(item);
        },
    }), [onDrop]);

    drop(ref);

    return (
        <div ref={ref} className='group min-w-[320px] bg-white-5 border border-amber-500 rounded-lg'>
            <main className='flex justify-between gap-2 p-2'>
                <div className='flex justify-center items-center gap-2'>
                    <Pause size='16px' />
                    <h2 className="font-base font-medium">On Hold</h2>
                </div>
                <p>{tasks.length}</p>
            </main>
            <div className="absolute hidden group-hover:flex min-w-[320px] bg-white-10">
                <div className="flex p-2 select-none">
                    {tasks.map((task) => (
                        <TaskItem key={task.id} task={task} />
                    ))}
                </div>
            </div>
        </div>
    )

}

export default OnHold;