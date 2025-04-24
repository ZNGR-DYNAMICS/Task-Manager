import { useRef } from 'react';
import { useDrag } from 'react-dnd';
import type { Task } from '../../types/Task';

interface TaskItemProps {
    task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [{ isDragging }, drag] = useDrag(() => ({
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
            className={`text-left w-full hover:bg-white-10 rounded-md p-2 text-sm font-medium transition-colors duration-200 cursor-move ${
                isDragging ? 'bg-white-10' : ''
            }`}
        >
            {task.title}
        </div>
    )
}

export default TaskItem;