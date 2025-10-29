import React from 'react';
import type { Sound } from '../types';

interface SoundSelectorProps {
  sounds: Sound[];
  selectedSound: string;
  onSelect: (url: string) => void;
}

const SoundIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 2a6 6 0 00-6 6v3.586l-1.707 1.707A1 1 0 003 15h14a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
    </svg>
);


export const SoundSelector: React.FC<SoundSelectorProps> = ({ sounds, selectedSound, onSelect }) => {
  return (
    <div className="mt-6 flex items-center justify-center">
      <label htmlFor="sound-select" className="flex items-center text-white/80 text-sm">
        <SoundIcon />
        Alert Sound
      </label>
      <select
        id="sound-select"
        value={selectedSound}
        onChange={(e) => onSelect(e.target.value)}
        className="ml-3 bg-white/10 text-white rounded-md border-transparent focus:border-white/50 focus:ring-0 text-sm py-1 px-2"
      >
        {sounds.map((sound) => (
          <option key={sound.id} value={sound.url} className="bg-gray-800">
            {sound.name}
          </option>
        ))}
      </select>
    </div>
  );
};
