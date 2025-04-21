import Phase from "./components/Phase";

const App: React.FC = () => {

    return (
        <div className='bg-black w-screen h-screen p-16'>
            <div className="flex justify-between w-full">
                <Phase />
                <Phase />
                <Phase />
            </div>
        </div>
    )
}

export default App;
