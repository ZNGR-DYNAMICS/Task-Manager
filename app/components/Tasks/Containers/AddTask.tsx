import { useState } from "react";
import { Task } from "../../../types/Task";
import { X } from "lucide-react";
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
const AddTask: React.FC<AddTaskProps> = ({ onClose, onAdd }) => {
    const [isClosing, setIsClosing] = useState(false); // Handles closing animation, before triggering onClose()
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
        handleClose();
    };

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            onClose();
        }, 200);
    };
 
    return (
        <motion.div
            initial={{ opacity: 0, x: -8 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute top-0 left-[360px] mt-20 bg-white text-black rounded-lg shadow-lg p-6 w-[300px] z-50"
            animate={isClosing ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }} // 👈 important for smooth closing
        >
            {/* Small triangle */}
            <div className="absolute -left-3 top-8 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-white" />
            
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Add New Task</h2>
                <button onClick={onClose}>
                    <X size={20} />
                </button>
            </div>
            
            <div className="flex flex-col gap-3">
                <input
                    className="border p-2 rounded-md"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    className="border p-2 rounded-md"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    className="border p-2 rounded-md"
                    placeholder="Assignee"
                    value={assignee}
                    onChange={(e) => setAssignee(e.target.value)}
                />
                <button
                    onClick={handleSubmit}
                    className="bg-black text-white py-2 rounded-md hover:bg-gray-800 mt-2"
                >
                    Create Task
                </button>
            </div>
        </motion.div>
    )
}

export default AddTask;