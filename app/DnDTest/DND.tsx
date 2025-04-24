import React, { useState, useRef } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import type { Task } from "../types/Task"; 

type TaskItemProps = {
    task: Task;
};

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [{ isDragging }, drag] = useDrag(() => ({
        type: task.type,
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
            {task.title}
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
        accept: "Task",
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


type CompactTaskContainerProps = {
    title: string;
    tasks: Task[];
    onDrop: (task: Task) => void;
};

const CompactTaskContainer: React.FC<CompactTaskContainerProps> = ({ title, tasks, onDrop }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [hovered, setHovered] = useState(false);

    const [, drop] = useDrop(() => ({
        accept: "Task",
        drop: (item: Task) => {
            onDrop(item);
        },
    }), [onDrop]);

    drop(ref);

    return (
        <div
            ref={ref}
            className="relative w-1/2 p-4 bg-white-25 hover:bg-white-50 border border-white-10 rounded min-h-[200px]"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <h2 className="text-xl font-bold mb-2">{title}</h2>
            <div className="text-sm">{tasks.length} task(s)</div>
            { hovered && (
                <div className="absolute z-10 left-0 top-0 mt-2 w-full bg-white border rounded shadow p-2">
                    {tasks.map((task) => (
                        <TaskItem key={task.id} task={task} />
                    ))}
                </div>
            )}
        </div>
    )
}

const InProgressDraggableTask: React.FC<{ task: Task }> = ({ task }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [{ isDragging }, drag] = useDrag(() => ({
        type: task.type,
        item: { ...task },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }), [task]);

    drag(ref);

    return (
        <div
            ref={ref}
            className={`inline-block p-2 mt-4 bg-blue-100 text-blue-800 border border-blue-400 rounded cursor-move text-sm ${
                isDragging ? "opacity-60" : "opacity-100"
            }`}
        >
            Move Task
        </div>
    );
};

type InProgressTaskContainerProps = {
    task: Task | null;
    onDrop: (task: Task) => void;
};
const InProgressTaskContainer: React.FC<InProgressTaskContainerProps> = ({ task, onDrop }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [, drop] = useDrop(() => ({
        accept: "Task",
        drop: (item: Task) => {
            onDrop(item);
        },
    }), [onDrop]);

    drop(ref);

    return (
        <div ref={ref} className="w-1/2 p-4 border border-yellow-400 rounded min-h-[200px] bg-yellow-50">
            <h2 className="text-xl font-bold mb-4">In Progress</h2>
            {task ? (
                <>
                    <div className="space-y-2">
                        <div className="font-semibold">{task.title}</div>
                        {task.description && <div>{task.description}</div>}
                        {task.assignee && <div><strong>Assignee:</strong> {task.assignee}</div>}
                        {task.dateDue && <div><strong>Due:</strong> {task.dateDue}</div>}
                        {task.taskSize && <div><strong>Size:</strong> {task.taskSize}</div>}
                        {task.files && task.files.length > 0 && (
                            <div>
                                <strong>Files:</strong>
                                <ul className="list-disc ml-5">
                                    {task.files.map((file, i) => <li key={i}>{file}</li>)}
                                </ul>
                            </div>
                        )}
                    </div>
                    <InProgressDraggableTask task={task} />
                </>
            ) : (
                <div className="text-gray-500 italic">Drop a task here</div>
            )}
        </div>
    );
}

const DND: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([
        { id: "1", title: "Task 1", status: "Backlog", type: "Task" },
        { id: "2", title: "Task 2", status: "Backlog", type: "Task" },
        { id: "3", title: "Task 3", status: "OnHold", type: "Task" },
        { id: "4", title: "Task 4", status: "Cancelled", type: "Task" },
        { id: "5", title: "Task 5", status: "Released", type: "Task" },
    ]);

    const handleDrop = (status: Task["status"]) => (task: Task) => {
        setTasks((prev) =>
            prev.map((t) =>
                t.id === task.id ? { ...t, status } : t
            )
        );
    };

    const handleInProgressDrop = (task: Task) => {
        setTasks((prev) =>
            prev.map((t) => {
                if (t.id === task.id) return { ...t, status: "InProgress" };
                if (t.status === "InProgress") return { ...t, status: "Backlog" };
                return t;
            })
        );
    };

    const getTasksByStatus = (status: Task["status"]) =>
        tasks.filter((task) => task.status === status);

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="grid grid-cols-3 gap-4 p-8">
                <TaskContainer title="Backlog" tasks={getTasksByStatus("Backlog")} onDrop={handleDrop("Backlog")} />
                <InProgressTaskContainer task={getTasksByStatus("InProgress")[0] || null} onDrop={handleInProgressDrop} />
                <CompactTaskContainer title="On Hold" tasks={getTasksByStatus("OnHold")} onDrop={handleDrop("OnHold")} />
                <TaskContainer title="Cancelled" tasks={getTasksByStatus("Cancelled")} onDrop={handleDrop("Cancelled")} />
                <TaskContainer title="Released" tasks={getTasksByStatus("Released")} onDrop={handleDrop("Released")} />
            </div>
        </DndProvider>
    );
};

export default DND;