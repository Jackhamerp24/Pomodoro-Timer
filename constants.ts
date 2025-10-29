import type { Background, Sound } from './types';
import { TimerMode } from './types';

export const TIME_OPTIONS: Record<TimerMode, number> = {
  [TimerMode.Work]: 25 * 60,
  [TimerMode.ShortBreak]: 5 * 60,
  [TimerMode.LongBreak]: 15 * 60,
};

export const POMODOROS_UNTIL_LONG_BREAK = 4;

export const DEFAULT_SPOTIFY_URL = 'https://open.spotify.com/embed/playlist/37i9dQZF1DX4sWSpwq3LiO?utm_source=generator';

export const BACKGROUNDS: Background[] = [
  { id: 'lofi-room', url: 'https://images.unsplash.com/photo-1618172193622-ae2d025f4032?q=80&w=1964&auto=format&fit=crop' },
  { id: 'chill-cafe', url: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?q=80&w=1991&auto=format&fit=crop' },
  { id: 'rainy-window', url: 'https://images.unsplash.com/photo-1587736891536-beb1e48bb22b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2069' },
  { id: 'night-train', url: 'https://images.unsplash.com/photo-1598881298757-0724dc0f905a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2073' },
  { id: 'peaceful-lake', url: 'https://images.unsplash.com/photo-1476231682828-37e571bc172f?q=80&w=1974&auto=format&fit=crop' },
  { id: 'mountain-sunset', url: 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?q=80&w=2070&auto=format&fit=crop' },
];


export const SOUNDS: Sound[] = [
  { id: 'bell', name: 'Bell', url: 'https://www.soundjay.com/buttons/sounds/button-16.mp3' },
  { id: 'chime', name: 'Chime', url: 'https://www.soundjay.com/buttons/sounds/button-7.mp3' },
  { id: 'beep', name: 'Beep', url: 'https://www.soundjay.com/buttons/sounds/beep-07a.mp3' },
  { id: 'ding', name: 'Ding', url: 'https://www.soundjay.com/buttons/sounds/button-4.mp3' },
];