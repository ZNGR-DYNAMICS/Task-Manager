import { useState } from 'react';
import { Task } from '../../types/Task';

interface TaskItemProps {
    task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ ...task }) => {
    const [selected, setSelected] = useState(false);

    function handleSelect() {
        setSelected(true);

        if (selected === true) {
            setSelected(false);
        }
    }

    return (
        <button
            className={`text-left w-full hover:bg-white-10 ${selected ? 'bg-white-10' : ''} rounded-md p-2 text-sm font-medium transition-colors duration-200 cursor-pointer`}
            onClick={handleSelect}
        >
            {task.title}
        </button>
    )
}

export default TaskItem;