import { Injectable } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private nativeEventList = [
    'play',
    'timeupdate',
    'canplay',
    'waiting',
    'pause',
    'ended',
    'error'
  ];

  private audio: HTMLAudioElement;

  readonly play$: Observable<Event>;

  readonly timeupdate$: Observable<Event>;

  readonly canplay$: Observable<Event>;

  readonly waiting$: Observable<Event>;

  readonly pause$: Observable<Event>;

  readonly ended$: Observable<Event>;

  readonly error$: Observable<string | Event>;

  constructor() {
    this.audio = new Audio();
    const { audio } = this;
    for (const eventName of this.nativeEventList) {
      this[`${eventName}$`] = fromEvent(audio, eventName);
    }
  }

  get currentTime() {
    return this.audio.currentTime;
  }

  set currentTime(val) {
    this.audio.currentTime = val;
  }

  setSrc(src: string): void {
    this.audio.src = src;
  }

  isPlaying(): boolean {
    return !this.audio.paused;
  }

  isEnded(): boolean {
    return this.audio.ended;
  }

  play(): Promise<void> {
    return this.audio.play();
  }

  pause(): Promise<void> {
    return Promise.resolve(this.audio.pause());
  }

  togglePlay(): Promise<void> {
    if (this.isPlaying()) {
      return this.pause();
    }
    return this.play();
  }

  volumeUp(): number {
    this.audio.volume += 
      this.audio.volume < 1
        ? 0.1
        : 0
    ;
    return this.audio.volume;
  }

  volumeDown(): number {
    this.audio.volume += 
      this.audio.volume > 0
        ? -0.1
        : 0
    ;
    return this.audio.volume;
  }

  isMuted(): boolean {
    return this.audio.muted;
  }
}
