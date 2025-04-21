import Phase from "./components/Phase";

const App: React.FC = () => {

    return (
        <div className='bg-black w-screen h-screen p-16'>
            <div className="flex justify-between w-full">
                <Phase phaseTitle="Concept" />
                <Phase phaseTitle="Develop" />
                <Phase phaseTitle="Release" />
            </div>
        </div>
    )
}

export default App;
