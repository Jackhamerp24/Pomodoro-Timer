
import React from 'react';

const PlayIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
    </svg>
);

const PauseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h1a1 1 0 001-1V8a1 1 0 00-1-1H8zm3 0a1 1 0 00-1 1v4a1 1 0 001 1h1a1 1 0 001-1V8a1 1 0 00-1-1h-1z" clipRule="evenodd" />
    </svg>
);

const ResetIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5M4 4l1.5 1.5A9 9 0 0120.5 10M20 20l-1.5-1.5A9 9 0 003.5 14" />
    </svg>
);


interface TimerControlsProps {
    isRunning: boolean;
    onStartPause: () => void;
    onReset: () => void;
}

export const TimerControls: React.FC<TimerControlsProps> = ({ isRunning, onStartPause, onReset }) => {
    return (
        <div className="flex items-center space-x-6 mt-4">
            <button onClick={onReset} className="text-white/70 hover:text-white transition-colors duration-300">
                <ResetIcon />
            </button>
            <button
                onClick={onStartPause}
                className="w-20 h-20 bg-white text-gray-900 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg transform hover:scale-105 transition-transform duration-300"
            >
                {isRunning ? <PauseIcon /> : <PlayIcon />}
            </button>
             <div className="w-6 h-6"></div> {/* Spacer to balance reset button */}
        </div>
    );
};
