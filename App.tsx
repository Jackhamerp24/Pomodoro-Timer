import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { TimerMode } from './types';
import { TIME_OPTIONS, POMODOROS_UNTIL_LONG_BREAK, BACKGROUNDS, SOUNDS, DEFAULT_SPOTIFY_URL } from './constants';
import { TimerDisplay } from './components/TimerDisplay';
import { TimerControls } from './components/TimerControls';
import { BackgroundSelector } from './components/BackgroundSelector';
import { SpotifyPlayer } from './components/SpotifyPlayer';
import { SoundSelector } from './components/SoundSelector';
import { Settings } from './components/Settings';

const SettingsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const ImageIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);


const App: React.FC = () => {
  const [timeOptions, setTimeOptions] = useState(TIME_OPTIONS);
  const [mode, setMode] = useState<TimerMode>(TimerMode.Work);
  const [timeLeft, setTimeLeft] = useState(timeOptions[TimerMode.Work]);
  const [isRunning, setIsRunning] = useState(false);
  const [pomodorosCompleted, setPomodorosCompleted] = useState(0);
  const [key, setKey] = useState(0); // Used to force re-render/reset of timer
  const [backgroundUrl, setBackgroundUrl] = useState(BACKGROUNDS[0].url);
  const [soundUrl, setSoundUrl] = useState(SOUNDS[0].url);
  const [showSettings, setShowSettings] = useState(false);
  const [isBgSelectorOpen, setIsBgSelectorOpen] = useState(false);
  const [spotifyUrl, setSpotifyUrl] = useState(() => {
    return localStorage.getItem('spotifyUrl') || DEFAULT_SPOTIFY_URL;
  });
  const currentBlobUrl = useRef<string | null>(null);


  const totalTime = useMemo(() => timeOptions[mode], [mode, timeOptions]);

  const switchMode = useCallback(() => {
    let nextMode: TimerMode;
    let newPomodorosCompleted = pomodorosCompleted;

    if (mode === TimerMode.Work) {
      newPomodorosCompleted++;
      setPomodorosCompleted(newPomodorosCompleted);
      if (newPomodorosCompleted % POMODOROS_UNTIL_LONG_BREAK === 0) {
        nextMode = TimerMode.LongBreak;
      } else {
        nextMode = TimerMode.ShortBreak;
      }
    } else {
      nextMode = TimerMode.Work;
    }

    setMode(nextMode);
    setTimeLeft(timeOptions[nextMode]);
    setIsRunning(false);
    setKey(prev => prev + 1); // Reset timer component
  }, [mode, pomodorosCompleted, timeOptions]);
  
  useEffect(() => {
    let interval: number | null = null;

    if (isRunning && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      const audio = new Audio(soundUrl);
      audio.play();
      switchMode();
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, timeLeft, switchMode, soundUrl]);

  // Effect for cleaning up blob URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      if (currentBlobUrl.current) {
        URL.revokeObjectURL(currentBlobUrl.current);
      }
    };
  }, []);


  const handleStartPause = () => {
    setIsRunning(prev => !prev);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(timeOptions[mode]);
  };
  
  const handleModeChange = (newMode: TimerMode) => {
    setMode(newMode);
    setTimeLeft(timeOptions[newMode]);
    setIsRunning(false);
    setKey(prev => prev + 1);
  }

  const handleSaveSettings = (newTimes: Record<TimerMode, number>) => {
      setTimeOptions(newTimes);
      if (!isRunning) {
        setTimeLeft(newTimes[mode]);
        setKey(prev => prev + 1);
      }
      setShowSettings(false);
  };

  const handleSpotifyUrlChange = (newUrl: string) => {
    setSpotifyUrl(newUrl);
    localStorage.setItem('spotifyUrl', newUrl);
  };
  
  const handleBackgroundSelect = (url: string) => {
    if (currentBlobUrl.current) {
        URL.revokeObjectURL(currentBlobUrl.current);
    }

    setBackgroundUrl(url);

    if (url.startsWith('blob:')) {
        currentBlobUrl.current = url;
    } else {
        currentBlobUrl.current = null;
    }
  };


  return (
    <div 
      className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 text-white bg-cover bg-center transition-all duration-1000"
      style={{ backgroundImage: `url(${backgroundUrl})` }}
    >
      <div className="absolute inset-0 bg-black/40"></div>
      
      <button 
        onClick={() => setShowSettings(true)} 
        className="absolute top-4 right-4 z-20 p-2 text-white/70 hover:text-white transition-colors duration-300 bg-black/20 rounded-full backdrop-blur-sm"
        aria-label="Open settings"
      >
          <SettingsIcon />
      </button>

      {showSettings && (
        <Settings 
            timeOptions={timeOptions}
            onSave={handleSaveSettings}
            onClose={() => setShowSettings(false)}
        />
      )}
      
      <main className="z-10 flex flex-col items-center justify-center w-full flex-grow">
        <div className="p-4 sm:p-8 bg-black/20 backdrop-blur-lg rounded-3xl shadow-2xl flex flex-col items-center">
            <div className="flex space-x-2 mb-6">
                <button 
                    onClick={() => handleModeChange(TimerMode.Work)}
                    className={`px-4 py-2 text-sm sm:text-base rounded-full transition-colors duration-300 ${mode === TimerMode.Work ? 'bg-white text-gray-900 font-semibold' : 'bg-white/10 hover:bg-white/20'}`}
                >
                    Pomodoro
                </button>
                <button 
                    onClick={() => handleModeChange(TimerMode.ShortBreak)}
                    className={`px-4 py-2 text-sm sm:text-base rounded-full transition-colors duration-300 ${mode === TimerMode.ShortBreak ? 'bg-white text-gray-900 font-semibold' : 'bg-white/10 hover:bg-white/20'}`}
                >
                    Short Break
                </button>
                 <button 
                    onClick={() => handleModeChange(TimerMode.LongBreak)}
                    className={`px-4 py-2 text-sm sm:text-base rounded-full transition-colors duration-300 ${mode === TimerMode.LongBreak ? 'bg-white text-gray-900 font-semibold' : 'bg-white/10 hover:bg-white/20'}`}
                >
                    Long Break
                </button>
            </div>

            <TimerDisplay key={key} timeLeft={timeLeft} totalTime={totalTime} mode={mode}/>
            <TimerControls isRunning={isRunning} onStartPause={handleStartPause} onReset={handleReset} />
            <SoundSelector 
              sounds={SOUNDS}
              selectedSound={soundUrl}
              onSelect={setSoundUrl}
            />
            <div className="mt-4 text-center">
                <p className="text-white/80 text-sm tracking-wider">
                    Round: {mode === TimerMode.Work ? Math.floor(pomodorosCompleted / POMODOROS_UNTIL_LONG_BREAK) + 1 : Math.floor((pomodorosCompleted -1) / POMODOROS_UNTIL_LONG_BREAK) + 1} | Session: {pomodorosCompleted % POMODOROS_UNTIL_LONG_BREAK || POMODOROS_UNTIL_LONG_BREAK} / {POMODOROS_UNTIL_LONG_BREAK}
                </p>
                <p className="text-white/60 text-xs mt-1">
                    Total Completed: {pomodorosCompleted}
                </p>
            </div>
        </div>

        <div className="mt-8">
          <SpotifyPlayer url={spotifyUrl} onUrlChange={handleSpotifyUrlChange} />
        </div>
      </main>

      <button
        onClick={() => setIsBgSelectorOpen(true)}
        className="absolute bottom-4 left-4 z-20 p-2 text-white/70 hover:text-white transition-colors duration-300 bg-black/20 rounded-full backdrop-blur-sm"
        aria-label="Change background"
      >
        <ImageIcon />
      </button>

      {isBgSelectorOpen && (
        <BackgroundSelector 
          backgrounds={BACKGROUNDS}
          selectedBackground={backgroundUrl}
          onSelect={handleBackgroundSelect}
          onClose={() => setIsBgSelectorOpen(false)}
        />
      )}
    </div>
  );
};

export default App;