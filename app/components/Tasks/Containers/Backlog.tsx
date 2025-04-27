import { useRef } from "react";
import { useDrop } from "react-dnd";
import { Plus, Circle } from "lucide-react";
import TaskItem from "../TaskItem";
import { Task } from "../../../types/Task";
import { AnimatePresence, motion } from "framer-motion";

interface BacklogProps {
    tasks: Task[];
    onDrop: (task: Task) => void;
    onAddTask: () => void;
}

const Backlog: React.FC<BacklogProps> = ({ tasks, onDrop, onAddTask }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [, drop] = useDrop(() => ({
        accept: "Task",
        drop: (item: Task) => {
            if (item.status !== "Backlog") onDrop(item);
        },
    }), [onDrop]);

    function handleAddTask() {
        onAddTask();
    }

    drop(ref);

    return (
        <div ref={ref} className='min-w-[320px] bg-white-5 border border-white-10 rounded-lg'>
            <header className='flex h-12 justify-between items-center p-2 border-b border-white-10'>
                <div className='pl-2 flex gap-2'>
                    <div className='flex justify-center items-center'>
                        <Circle size='16px' strokeWidth={2} />
                    </div>
                    <h2 className='font'>Backlog</h2>
                </div>
                <button
                    className='hover:bg-white-5 border border-white-10 rounded-md p-1 text-white cursor-pointer transition-colors duration-200 hover:shadow-sm shadow-neutral-950'
                    onClick={handleAddTask}
                >
                    <Plus size='16px' />
                </button>
            </header>
            <main className="p-2">
                <AnimatePresence>
                    {tasks.map(task => (
                        <motion.div
                            key={task.id}
                            layout
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10, height: 0 }}
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