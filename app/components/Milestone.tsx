import { DiamondIcon } from "lucide-react";

const Milestone: React.FC = () => {
    return (
        <div className="w-full bg-white-5 border border-white-10 rounded-lg flex-grow font-medium overflow-y-auto">
            <div className="h-12 flex justify-between items-center px-4 gap-16">
                <div className="flex justify-center items-center gap-2">
                    <DiamondIcon size="16px" />
                    <h1>Milestone</h1>
                </div>
                <p>1 / 3 / 4</p>
            </div>
        </div>
    )
}

export default Milestone;