
interface Phase {
    phaseTitle: string;
}

const Phase: React.FC<Phase> = ({ phaseTitle }) => {
    return (
        <div className="w-[280px] bg-white5
            border border-white/5 rounded-lg
            p-4
        ">
            <h1 className="text-white font-bold">{phaseTitle}</h1>
            <div className="text-white text-sm">
                Number of Tasks
            </div>
        </div>
    )
}

export default Phase;