import { useEffect, useState, useRef, useCallback } from "react";
import { useDrop } from "react-dnd";
import { CirclePause } from "lucide-react";
import { Task } from "../../../types/Task";
import TaskItem from "../TaskItem";
import { AnimatePresence, motion } from "framer-motion";

interface OnHoldProps {
    tasks: Task[];
    onDrop: (task: Task) => void;
}

const OnHold: React.FC<OnHoldProps> = ({ tasks, onDrop }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const [, drop] = useDrop(() => ({
        accept: "Task",
        drop: (item: Task) => {
            if (item.status !== "OnHold") onDrop(item);
        },
    }), [onDrop]);

    drop(ref);

    const handleShowDropdown = useCallback(() => {
        if (showDropdown === true) {
            setIsClosing(true);
            setTimeout(() => {
                setShowDropdown(false);
                setIsClosing(false);
            }, 200);
        } else {
            setShowDropdown(true);
            setIsClosing(false);
        }
    }, [showDropdown]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (showDropdown && ref.current && !ref.current.contains(event.target as Node)) {
                handleShowDropdown();
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        };
    }, [showDropdown, handleShowDropdown]);

    return (
        <div ref={ref} className='relative group w-fit min-w-[320px] bg-white-5 border border-amber-500 rounded-lg overflow-visible'>
            <main className='h-12 flex justify-between items-center gap-2 px-4 py-2 cursor-pointer' onClick={handleShowDropdown}>
                <div className='flex justify-center items-center gap-2' tabIndex={0}>
                    <CirclePause size='16px' />
                    <h2 className="font-base font-medium">On Hold</h2>
                </div>
                <p>{tasks.length}</p>
            </main>
            {showDropdown && tasks.length > 0 && (
                <AnimatePresence>
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={isClosing ? "exit" : "enter"}
                        variants={{
                            enter: { opacity: 1, y: 0 },
                            exit: { opacity: 0, y: -8 }
                        }}
                        exit="exit"
                        transition={{ duration: 0.2 }}
                        className="absolute top-full mt-1 left-0 -translate-x-[1px]
                        bg-white-5-plain border border-amber-500 
                        rounded-lg shadow-lg 
                        transition-opacity duration-200
                        min-w-[320px] z-10"
                    >
                        <div className="p-2">
                            {tasks.map((task) => (
                                <TaskItem key={task.id} task={task} />
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            )}
        </div>
    )
}

export default OnHold;