import React, { useRef } from "react";
import { useDrop } from "react-dnd";
import { Task } from "../../../types/Task";

interface OnHoldProps {
    tasks: Task[];
    onDrop: (task: Task) => void;
}

const OnHold: React.FC<OnHoldProps> = ({ tasks }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [, drop] = useDrop(() => ({
        accept: "Task",
        drop: (item: Task) => {
            if (item.status !== "OnHold") onDrop(item);
        },
    }), [onDrop]);

    drop(ref);

    return (
        <div ref={ref} className='min-w-[320px] bg-white-5 border border-white-10 rounded-lg'>
            <main className='flex gap-2'>
                <div className='flex justify-center items-center'>
                    <Circle size='16px' />
                </div>
                <h2 className='font-base font-medium'>Backlog</h2>
            </main>
            <div className="absolute hidden hover:flex">
                <div className="flex p-2 select-none">
                    <h2 className="font-base font-medium">On Hold</h2>
                </div>
            </div>
            {tasks.length}
        </div>
    )

}