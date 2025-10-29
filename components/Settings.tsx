import React, { useState, useEffect } from 'react';
import { TimerMode } from '../types';

interface SettingsProps {
  timeOptions: Record<TimerMode, number>;
  onSave: (newTimes: Record<TimerMode, number>) => void;
  onClose: () => void;
}

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);


export const Settings: React.FC<SettingsProps> = ({ timeOptions, onSave, onClose }) => {
    const [workMin, setWorkMin] = useState(0);
    const [shortBreakMin, setShortBreakMin] = useState(0);
    const [longBreakMin, setLongBreakMin] = useState(0);

    useEffect(() => {
        setWorkMin(timeOptions[TimerMode.Work] / 60);
        setShortBreakMin(timeOptions[TimerMode.ShortBreak] / 60);
        setLongBreakMin(timeOptions[TimerMode.LongBreak] / 60);
    }, [timeOptions]);

    const handleSave = () => {
        onSave({
            [TimerMode.Work]: Math.max(1, workMin) * 60,
            [TimerMode.ShortBreak]: Math.max(1, shortBreakMin) * 60,
            [TimerMode.LongBreak]: Math.max(1, longBreakMin) * 60,
        });
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center" onClick={onClose}>
            <div 
                className="relative bg-gray-800/80 backdrop-blur-xl text-white p-8 rounded-2xl shadow-2xl w-full max-w-sm"
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
                    <CloseIcon />
                </button>
                <h2 className="text-2xl font-bold mb-6 text-center">Timer Settings</h2>

                <div className="space-y-4">
                    <div>
                        <label htmlFor="work-timer" className="block text-sm font-medium text-gray-300 mb-1">Pomodoro (minutes)</label>
                        <input
                            id="work-timer"
                            type="number"
                            value={workMin}
                            onChange={(e) => setWorkMin(Number(e.target.value))}
                            min="1"
                            className="w-full bg-gray-700/50 rounded-md border-gray-600 focus:ring-2 focus:ring-white/50 focus:border-transparent text-white px-3 py-2"
                        />
                    </div>
                     <div>
                        <label htmlFor="short-break-timer" className="block text-sm font-medium text-gray-300 mb-1">Short Break (minutes)</label>
                        <input
                            id="short-break-timer"
                            type="number"
                            value={shortBreakMin}
                            onChange={(e) => setShortBreakMin(Number(e.target.value))}
                            min="1"
                            className="w-full bg-gray-700/50 rounded-md border-gray-600 focus:ring-2 focus:ring-white/50 focus:border-transparent text-white px-3 py-2"
                        />
                    </div>
                     <div>
                        <label htmlFor="long-break-timer" className="block text-sm font-medium text-gray-300 mb-1">Long Break (minutes)</label>
                        <input
                            id="long-break-timer"
                            type="number"
                            value={longBreakMin}
                            onChange={(e) => setLongBreakMin(Number(e.target.value))}
                            min="1"
                            className="w-full bg-gray-700/50 rounded-md border-gray-600 focus:ring-2 focus:ring-white/50 focus:border-transparent text-white px-3 py-2"
                        />
                    </div>
                </div>

                <div className="mt-8">
                    <button 
                        onClick={handleSave}
                        className="w-full bg-white text-gray-900 font-bold py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors duration-300"
                    >
                        Save
                    </button>
                </div>

            </div>
        </div>
    );
};
