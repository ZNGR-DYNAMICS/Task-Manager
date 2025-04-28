import { useRef, useState } from "react";
import { useDrop } from "react-dnd";
import { Plus, Circle, X } from "lucide-react";
import TaskItem from "../TaskItem";
import AddTask from "./AddTask";
import { Task } from "../../../types/Task";
import { AnimatePresence, motion } from "framer-motion";

interface BacklogProps {
    tasks: Task[];
    onDrop: (task: Task) => void;
    onAddTask: (task: Partial<Task>) => void;
}

const Backlog: React.FC<BacklogProps> = ({ tasks, onDrop, onAddTask }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isAddingTask, setIsAddingTask] = useState(false);
    const [, drop] = useDrop(() => ({
        accept: "Task",
        drop: (item: Task) => {
            if (item.status !== "Backlog") onDrop(item);
        },
    }), [onDrop]);

    function toggleAddTask() {
        if (isAddingTask) {
            handleCloseAddTask();
            return;
        }
        setIsAddingTask(true);
    }

    function handleConfirmAddTask(taskData: Partial<Task>) {
        onAddTask(taskData);
        setIsAddingTask(false);
    }

    function handleCloseAddTask() {
        setIsAddingTask(false);
    }

    drop(ref);

    const textVariants = {
        hidden: { opacity: 0, y: -8 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 8 },
    }

    const layoutTransition = { duration: 0.2, ease: "easeInOut" };

    return (
        <div ref={ref} className='min-w-[320px] bg-white-5 border border-white-10 rounded-lg'>
            <motion.header className={`min-h-12 flex flex-col gap-2 p-2 border-b border-white-10 ${isAddingTask ? 'justify-center' : ''}`}
                transition={{layoutTransition}}
                layout
            >
                <div className='flex w-full justify-between items-center'>
                    <div className='pl-2 flex gap-2 items-center overflow-hidden'>
                        <div className='flex justify-center items-center'>
                            <div>
                                <Circle size='16px' strokeWidth={2} />
                            </div>
                        </div>
                        <div className="relative h-6 w-24">
                            <AnimatePresence initial={false} mode="wait">
                                <motion.h2
                                    key={isAddingTask ? 'add' : 'backlog'}
                                    variants={textVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    transition={{ duration: 0.2 }}
                                    className='absolute font-semibold whitespace-nowrap'
                                >
                                    {isAddingTask ? "Add Task" : "Backlog"}
                                </motion.h2>
                            </AnimatePresence>
                        </div>
                    </div>
                    <button
                        className='hover:bg-white-5 border border-white-10 rounded-md p-1 text-white cursor-pointer transition-colors duration-200 hover:shadow-sm shadow-neutral-950'
                        onClick={toggleAddTask}
                        aria-label={isAddingTask ? "Cancel adding task" : "Add new task"}
                    >
                         <AnimatePresence initial={false} mode="wait">
                            <motion.div
                                key={isAddingTask ? 'close' : 'add'}
                                initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
                                transition={{ duration: 0.2 }}
                            >
                                {isAddingTask ? <X size='16px' /> : <Plus size='16px' />}
                            </motion.div>
                        </AnimatePresence>
                    </button>
                </div>
                <AnimatePresence>
                    {isAddingTask && (
                        <AddTask
                            onClose={handleCloseAddTask}
                            onAdd={handleConfirmAddTask}
                        />
                    )}
                </AnimatePresence>
            </motion.header>
            <main className="p-2">
                <AnimatePresence>
                    {tasks.map(task => (
                        <motion.div
                            key={task.id}
                            layout
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8, height: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <TaskItem key={task.id} task={task} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </main>
        </div>
    )
}

export default Backlog;