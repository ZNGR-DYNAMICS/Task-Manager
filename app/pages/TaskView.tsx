import React from 'react';
import Milestone from '../components/Milestone';

const TaskView: React.FC = () => {
    return (
        <div className='flex flex-col w-screen h-screen bg-black p-8 text-white'>
            <div className='flex flex-row justify-between mb-4'>
                <h1 className='text-lg font-semibold'>Task View</h1>
                <Milestone />
            </div>
            <div className='flex flex-row h-full gap-8'>
                <div className='min-w-[320px] bg-white-5 border border-white-10 rounded-lg'>
                    <header className='flex justify-between p-4 border-b border-white-10'>
                        <h2 className='text-base font-semibold'>Tasks</h2>
                        <button className='flex justify-center border border-white-10 rounded-md p-2'>
                            <p className='w-4 h-4'>+</p>
                        </button>
                    </header>
                    <main>
                        <ul>
                            <li>element</li>
                            <li>element</li>
                            <li>element</li>
                        </ul>
                    </main>
                </div>
                <div className='w-full bg-white-5 border border-white-10 rounded-lg flex-grow overflow-y-auto'>
                    <header className='flex justify-between p-4 border-b border-white-10'>
                        <h2 className='text-base font-semibold'>Tasks</h2>
                        <button className='flex justify-center border border-white-10 rounded-md p-2'>
                            <p className='w-4 h-4'>+</p>
                        </button>
                    </header>
                </div>
                <div className='min-w-[320px] bg-red-500'>
                    test
                </div>
            </div>
            </div>
    );
};

export default TaskView;