import React, { useState } from 'react';
import type { Background } from '../types';

interface BackgroundSelectorProps {
  backgrounds: Background[];
  selectedBackground: string;
  onSelect: (url: string) => void;
  onClose: () => void;
}

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15 MB

export const BackgroundSelector: React.FC<BackgroundSelectorProps> = ({ backgrounds, selectedBackground, onSelect, onClose }) => {
    const [customUrl, setCustomUrl] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleSetCustomUrl = (e: React.FormEvent) => {
        e.preventDefault();
        if (customUrl.trim()) {
            onSelect(customUrl);
            setCustomUrl('');
            setError(null);
        }
    };
    
    const handleFile = (file: File | undefined) => {
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            setError('File must be an image (JPG, PNG, GIF, etc.).');
            return;
        }

        if (file.size > MAX_FILE_SIZE) {
            setError(`File size cannot exceed ${MAX_FILE_SIZE / (1024 * 1024)}MB.`);
            return;
        }

        setError(null);
        const fileUrl = URL.createObjectURL(file);
        onSelect(fileUrl);
        onClose();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleFile(e.target.files?.[0]);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        handleFile(e.dataTransfer.files?.[0]);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };
    
    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }

    const handleSelectAndClose = (url: string) => {
        onSelect(url);
        onClose();
    }
  
    return (
        <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4" onClick={onClose}>
            <div 
                className="relative bg-gray-800/80 backdrop-blur-xl text-white p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-3xl"
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
                    <CloseIcon />
                </button>
                <h2 className="text-2xl font-bold mb-6 text-center">Change Background</h2>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-8">
                    {backgrounds.map((bg) => (
                        <button
                            key={bg.id}
                            onClick={() => handleSelectAndClose(bg.url)}
                            className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white ${
                                selectedBackground === bg.url ? 'border-white' : 'border-transparent hover:border-white/50'
                            }`}
                        >
                            <img src={bg.url} alt={bg.id} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                            <div className="absolute inset-0 bg-black/20"></div>
                        </button>
                    ))}
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-lg font-semibold mb-3">From URL</h3>
                        <form 
                            onSubmit={handleSetCustomUrl}
                            className="p-3 bg-gray-900/50 rounded-lg w-full flex items-center space-x-2"
                        >
                            <input
                                type="url"
                                value={customUrl}
                                onChange={(e) => setCustomUrl(e.target.value)}
                                placeholder="Paste any image URL here"
                                className="flex-grow bg-gray-700/50 rounded-md border-gray-600 focus:ring-2 focus:ring-white/50 focus:border-transparent text-white px-3 py-2 text-sm"
                            />
                            <button type="submit" className="px-4 py-2 text-sm rounded-md bg-white text-gray-900 font-semibold hover:bg-gray-200 transition-colors">
                                Set
                            </button>
                        </form>
                    </div>
                     <div>
                        <h3 className="text-lg font-semibold mb-3">From your computer</h3>
                        <div
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            className={`border-2 border-dashed border-gray-500 rounded-lg p-6 text-center bg-gray-900/50 transition-colors duration-300 ${isDragging ? 'border-white bg-gray-900' : ''}`}
                        >
                            <input 
                                type="file" 
                                id="file-upload" 
                                className="hidden" 
                                onChange={handleFileChange}
                                accept="image/*"
                            />
                            <label htmlFor="file-upload" className="font-semibold text-white cursor-pointer bg-white/10 hover:bg-white/20 px-4 py-2 rounded-md transition-colors">
                                Choose a file
                            </label>
                            <p className="text-sm text-gray-400 mt-2">or drag and drop</p>
                        </div>
                    </div>
                </div>
                 {error && <p className="text-red-400 text-center mt-4 text-sm">{error}</p>}
            </div>
        </div>
    );
};