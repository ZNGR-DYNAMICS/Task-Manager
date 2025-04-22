import React, { useState, useRef } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ItemTypes = {
    TASK: "task",
};

type Task = {
    id: string;
    label: string;
};

type TaskItemProps = {
    task: Task;
};

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.TASK,
        item: { ...task },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }), [task]);

    drag(ref);

    return (
        <div
            ref={ref}
            className={`p-2 m-2 bg-blue-500 text-white rounded cursor-move shadow ${
                isDragging ? "opacity-60" : "opacity-100"
            }`}
        >
            {task.label}
        </div>
    );
};

type TaskContainerProps = {
    title: string;
    tasks: Task[];
    onDrop: (task: Task) => void;
};

const TaskContainer: React.FC<TaskContainerProps> = ({ title, tasks, onDrop }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [, drop] = useDrop(() => ({
        accept: ItemTypes.TASK,
        drop: (item: Task) => {
            onDrop(item);
        },
    }), [onDrop]);

    drop(ref);

    return (
        <div ref={ref} className="w-1/2 p-4 border border-gray-300 rounded min-h-[200px]">
            <h2 className="text-xl font-bold mb-4">{title}</h2>
            {tasks.map((task) => (
                <TaskItem key={task.id} task={task} />
            ))}
        </div>
    );
};

const DND: React.FC = () => {
    const [leftTasks, setLeftTasks] = useState<Task[]>([
        { id: "1", label: "Task 1" },
        { id: "2", label: "Task 2" },
    ]);
    const [rightTasks, setRightTasks] = useState<Task[]>([]);

    const handleDropLeft = (task: Task) => {
        if (!leftTasks.find((t) => t.id === task.id)) {
            setRightTasks((prev) => prev.filter((t) => t.id !== task.id));
            setLeftTasks((prev) => [...prev, task]);
        }
    };

    const handleDropRight = (task: Task) => {
        if (!rightTasks.find((t) => t.id === task.id)) {
            setLeftTasks((prev) => prev.filter((t) => t.id !== task.id));
            setRightTasks((prev) => [...prev, task]);
        }
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="flex gap-4 p-8">
                <TaskContainer title="To Do" tasks={leftTasks} onDrop={handleDropLeft} />
                <TaskContainer title="Done" tasks={rightTasks} onDrop={handleDropRight} />
            </div>
        </DndProvider>
    );
};

export default DND;