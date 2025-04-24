import { useDragLayer } from "react-dnd";
import { Task } from "../../types/Task";

const layerStyles: React.CSSProperties = {
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: 100,
    top: 0,
    left: 0,
    width: '100%',
};

function getItemStyles(currentOffset: { x: number, y: number } | null) {
    if (!currentOffset) {
        return { display: 'none' };
    }

    const { x, y } = currentOffset;
    const transform = `translate(${x}px, ${y}px)`;
    return { transform, WebkitTransform: transform, width: '302px' }; 
}

const TaskDragPreview = () => {
    const { isDragging, item, currentOffset } = useDragLayer((monitor) => ({
        isDragging: monitor.isDragging(),
        item: monitor.getItem() as Task | null,
        currentOffset: monitor.getSourceClientOffset(),
    }));

    if (!isDragging || !item) return null;

    return (
        <div style={layerStyles}>
            <div
                style={getItemStyles(currentOffset)}
                className='text-left w-full bg-white-5 border border-white-5 rounded-md p-2 text-sm font-medium shadow-sm shadow-neutral-950 text-white'
            >
                {item.title}
            </div>
        </div>
    )
}

export default TaskDragPreview;