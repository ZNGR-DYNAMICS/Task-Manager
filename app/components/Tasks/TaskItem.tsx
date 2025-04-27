import { useRef } from 'react';
import { useDrag } from 'react-dnd';
import type { Task } from '../../types/Task';

interface TaskItemProps {
    task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [, drag] = useDrag(() => ({
        type: "Task",
        item: { ...task },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }), [task]);

    drag(ref);


    return (
        <div
            ref={ref}
            className="w-full text-left hover:bg-white-5 border border-transparent hover:border-white-5 rounded-md p-2 text-sm cursor-move transition-all duration-200 hover:shadow-sm shadow-neutral-950"
        >
            {task.title}
        </div>
    )
}

export default TaskItem;