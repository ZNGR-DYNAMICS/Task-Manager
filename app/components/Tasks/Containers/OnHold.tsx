import { useEffect, useState, useRef } from "react";
import { useDrop } from "react-dnd";
import { Pause } from "lucide-react";
import { Task } from "../../../types/Task";
import TaskItem from "../TaskItem";

interface OnHoldProps {
    tasks: Task[];
    onDrop: (task: Task) => void;
}

const OnHold: React.FC<OnHoldProps> = ({ tasks, onDrop }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const [, drop] = useDrop(() => ({
        accept: "Task",
        drop: (item: Task) => {
            if (item.status !== "OnHold") onDrop(item);
        },
    }), [onDrop]);

    drop(ref);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        };
    }, []);

    return (
        <div ref={ref} className='relative group w-fit min-w-[320px] bg-white-5 border border-amber-500 rounded-lg overflow-visible'>
            <main className='flex justify-between gap-2 p-2 cursor-pointer' onClick={() => setShowDropdown((prev) => !prev)}>
                <div className='flex justify-center items-center gap-2' tabIndex={0}>
                    <Pause size='16px' />
                    <h2 className="font-base font-medium">On Hold</h2>
                </div>
                <p>{tasks.length}</p>
            </main>
            {showDropdown && tasks.length > 0 && (
                <div
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
                </div>
            )}
        </div>
    )

}

export default OnHold;