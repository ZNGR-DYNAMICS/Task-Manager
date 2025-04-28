import { useState } from "react";
import { Task } from "../../../types/Task";
import { motion } from "framer-motion";

/**
 * Props for the AddTask component.
 * @property onClose - Callback to close the add task modal.
 * @property onAdd - Callback to add a new task. Receives a partial Task object.
 */
interface AddTaskProps {
    onClose: () => void;
    onAdd: (task: Partial<Task>) => void;
}

/**
 * AddTask component allows users to create a new task.
 * 
 * @param AddTaskProps - Component props.
 * @returns  The rendered AddTask modal.
 */
const AddTask: React.FC<AddTaskProps> = ({ onAdd }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [assignee, setAssignee] = useState('');

    const handleSubmit = () => {
        if (!title.trim()) return;
        onAdd({
            title,
            description,
            assignee,
            status: 'Backlog',
            type: 'Task',
            dateCreated: new Date().toISOString().split('T')[0],
        });
    };
 
    return (
        <motion.div
            initial={{ opacity: 0 }} // Start invisible and slightly above
            animate={{ opacity: 1 }}   // Fade in and slide down to position
            exit={{ opacity: 0, height: 0 }}    // Fade out and slide up slightly
            transition={{ duration: 0.2 }} // Can be quicker than parent layout animation
            className="p-4 pt-2 overflow-hidden"
        >            
            <div className="flex flex-col gap-2">
                <input
                    className="hover:bg-white-5 border border-white-5 p-2 rounded-md text-white focus:outline-none transition-colors duration-200"
                    placeholder="Title (required)"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    aria-label="Task Title"
                />
                <textarea
                    className="hover:bg-white-5 border border-white-5 p-2 rounded-md text-white focus:outline-none min-h-fit max-h-96 transition-colors duration-200"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    aria-label="Task Description"
                />
                <input
                    className="hover:bg-white-5 border border-white-5 p-2 rounded-md text-white focus:outline-none transition-colors duration-200"
                    placeholder="Assignee"
                    value={assignee}
                    onChange={(e) => setAssignee(e.target.value)}
                    aria-label="Task Assignee"
                />
                <button
                    onClick={handleSubmit}
                    className="hover:bg-white-5 border border-white-5 p-2 rounded-md text-white focus:outline-none disabled:opacity-50 transition-colors duration-200"
                    disabled={!title.trim()}
                >
                    Create Task
                </button>
            </div>
        </motion.div>
    )
}

export default AddTask;