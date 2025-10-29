import React, { useState } from 'react';

const EditIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
        <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
    </svg>
);

interface SpotifyPlayerProps {
    url: string;
    onUrlChange: (newUrl: string) => void;
}

export const SpotifyPlayer: React.FC<SpotifyPlayerProps> = ({ url, onUrlChange }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState<string | null>(null);

    const parseSpotifyUrl = (input: string): string | null => {
        try {
            // Handles URLs like https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M
            const url = new URL(input);
            const pathParts = url.pathname.split('/');
            const playlistIndex = pathParts.indexOf('playlist');
            if (playlistIndex !== -1 && pathParts.length > playlistIndex + 1) {
                const playlistId = pathParts[playlistIndex + 1];
                return `https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator`;
            }
        } catch (e) {
            // Handles URIs like spotify:playlist:37i9dQZF1DXcBWIGoYBM5M
            if (input.startsWith('spotify:playlist:')) {
                const playlistId = input.split(':')[2];
                if (playlistId) {
                    return `https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator`;
                }
            }
        }
        return null;
    };

    const handleSave = () => {
        const newEmbedUrl = parseSpotifyUrl(inputValue);
        if (newEmbedUrl) {
            onUrlChange(newEmbedUrl);
            setIsEditing(false);
            setInputValue('');
            setError(null);
        } else {
            setError("Invalid Spotify URL. Please use a valid playlist link.");
        }
    };

    return (
        <div className="w-full max-w-sm md:max-w-md mx-auto rounded-xl shadow-lg overflow-hidden relative group">
            <iframe
                key={url} // Re-mounts iframe when URL changes
                style={{ borderRadius: '12px' }}
                src={url}
                width="100%"
                height="152"
                frameBorder="0"
                allowFullScreen={false}
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title="Spotify Player"
            ></iframe>
            <button
                onClick={() => setIsEditing(true)}
                className="absolute top-2 right-2 p-2 bg-black/30 rounded-full text-white/70 opacity-0 group-hover:opacity-100 hover:text-white transition-all duration-300"
                aria-label="Change Spotify playlist"
            >
                <EditIcon />
            </button>

            {isEditing && (
                <div className="absolute inset-0 bg-black/70 backdrop-blur-md flex flex-col items-center justify-center p-4">
                    <h3 className="text-lg font-semibold text-white mb-3">Change Playlist</h3>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Paste Spotify playlist link"
                        className="w-full bg-gray-700/50 rounded-md border-gray-600 focus:ring-2 focus:ring-white/50 focus:border-transparent text-white px-3 py-2 text-sm"
                    />
                    {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
                    <div className="flex space-x-3 mt-4">
                        <button
                            onClick={() => setIsEditing(false)}
                            className="px-4 py-2 text-sm rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-300"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="px-4 py-2 text-sm rounded-full bg-white text-gray-900 font-semibold hover:bg-gray-200 transition-colors duration-300"
                        >
                            Save
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};