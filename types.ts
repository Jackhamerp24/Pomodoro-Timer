export enum TimerMode {
  Work = 'work',
  ShortBreak = 'shortBreak',
  LongBreak = 'longBreak',
}

export interface Background {
  id: string;
  url: string;
}

export interface Sound {
  id: string;
  name: string;
  url: string;
}