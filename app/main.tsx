import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import '../fonts/poppins.css';
import App from './App.tsx'
import TaskView from './pages/TaskView.tsx';
import DND from './DnDTest/DND.tsx';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <DndProvider backend={HTML5Backend}>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/task" element={<TaskView />} />
                    <Route path="/dnd" element={<DND />} />
                </Routes>
            </DndProvider>
        </BrowserRouter>
    </StrictMode>,
)
