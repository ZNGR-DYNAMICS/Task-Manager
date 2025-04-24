import { useEffect, useRef } from 'react';
import { useDrag } from 'react-dnd';
import type { Task } from '../../types/Task';
import { getEmptyImage } from 'react-dnd-html5-backend';

interface TaskItemProps {
    task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => { 
    const ref = useRef<HTMLDivElement>(null);
    const [{ isDragging }, drag, preview] = useDrag(() => ({
        type: 'Task',
        item: { ...task },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }), [task]);

    useEffect(() => {
        preview(getEmptyImage(), { captureDraggingState: true });
    }, [preview]);

    drag(ref);

    return (
        <div
            ref={ref}
            className={`text-left w-full hover:bg-white-5 border border-transparent hover:border-white-5 rounded-md p-2 text-sm font-medium cursor-move transition-all duration-200 hover:shadow-sm shadow-neutral-950
                ${isDragging ? '' : ''}
                `}
        >
            {task.title}
        </div>
    )
}

export default TaskItem;