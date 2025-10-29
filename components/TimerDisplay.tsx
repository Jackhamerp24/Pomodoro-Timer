
import React, { useMemo } from 'react';
import { TimerMode } from '../types';

interface TimerDisplayProps {
  timeLeft: number;
  totalTime: number;
  mode: TimerMode;
}

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const getModeText = (mode: TimerMode): string => {
    switch (mode) {
        case TimerMode.Work:
            return "Time to Focus";
        case TimerMode.ShortBreak:
            return "Short Break";
        case TimerMode.LongBreak:
            return "Long Break";
        default:
            return "";
    }
}

export const TimerDisplay: React.FC<TimerDisplayProps> = ({ timeLeft, totalTime, mode }) => {
  const progress = useMemo(() => (timeLeft / totalTime) * 100, [timeLeft, totalTime]);
  const circumference = 2 * Math.PI * 140; // 2 * PI * radius
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative w-80 h-80 sm:w-96 sm:h-96 flex items-center justify-center">
      <svg className="absolute w-full h-full transform -rotate-90" viewBox="0 0 300 300">
        <circle
          cx="150"
          cy="150"
          r="140"
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          className="text-white/20"
        />
        <circle
          cx="150"
          cy="150"
          r="140"
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="text-white transition-all duration-500 ease-linear"
        />
      </svg>
      <div className="z-10 text-center text-white">
        <h2 className="text-xl sm:text-2xl font-semibold tracking-wider mb-2">{getModeText(mode)}</h2>
        <p className="text-6xl sm:text-8xl font-bold tracking-tighter">{formatTime(timeLeft)}</p>
      </div>
    </div>
  );
};
