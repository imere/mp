import { Injectable } from '@angular/core';
import { MusicsDataConfig } from 'src/config/musics';
import { Observable, Subject, Subscription } from 'rxjs';
import { map, throttleTime } from 'rxjs/operators';

import { AudioService } from './audio.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  private musicDataList: MusicsDataConfig = [];

  private currentIndex = 0;

  private switchMusic$: Subject<unknown>;

  constructor(private audioService: AudioService, private config: ConfigService) {
    this.switchMusic$ = new Subject();
    this.setMusicDataList();
    this.setCurMusic(this.currentIndex);
  }

  getCurrentMusicWithInfo() {
    const { currentIndex, musicDataList } = this;
    return Object.freeze({
      index: currentIndex,
      length: musicDataList.length,
      music: musicDataList[currentIndex],
      musics: [...musicDataList]
    });
  }

  setMusicDataList(): void {
    this.musicDataList = this.config.getMusicsConfig();
  }

  hasMusic(): boolean {
    return this.musicDataList.length !== 0;
  }

  isPlaying(): boolean {
    return this.audioService.isPlaying();
  }

  play(): Promise<void> {
    return this.audioService.play();
  }

  pause(): Promise<void> {
    return this.audioService.pause();
  }

  togglePlay(): Promise<void> {
    return this.audioService.togglePlay();
  }

  updateTime(currentTime: number): void {
    this.audioService.currentTime = currentTime;
  }

  previous(): number {
    let { currentIndex } = this;
    if (currentIndex < 0) {
      if (this.musicDataList.length) {
        currentIndex += this.musicDataList.length; 
      } else {
        currentIndex = 0; 
      }
    }
    this.setCurMusic(currentIndex);
    this.switchMusic$.next();
    return this.currentIndex = currentIndex;
  }

  next(): number {
    let { currentIndex } = this;
    currentIndex = (currentIndex + 1) % this.musicDataList.length;
    if (Number.isNaN(currentIndex) || !Number.isFinite(currentIndex)) {
      currentIndex = 0;
    }
    this.setCurMusic(currentIndex);
    this.switchMusic$.next();
    return this.currentIndex = currentIndex;
  }

  setCurMusic(idx: number): void {
    this.audioService.setSrc(this.musicDataList[idx]?.src);
  }

  attachSwitchMusic(fn: Function): void {
    this.switchMusic$.subscribe(() => fn());
  }

  attachTimeUpdate(fn: (param: { currentTime: number, duration: number; }) => void): Subscription {
    return this.audioService.timeupdate$.pipe(
      throttleTime(1000),
      map((ev) => {
        const target = ev.target as HTMLAudioElement;
        return {
          currentTime: target.currentTime,
          duration: target.duration
        };
      })
    ).subscribe(fn);
  }

  attachPlay(fn: (ev: Event) => void): Subscription {
    return this.audioService.play$.subscribe(fn);
  }

  attachWaiting(fn: (ev: Event) => void): Subscription {
    return this.audioService.waiting$.subscribe(fn);
  }

  attachCanPlay(fn: (ev: Event) => void): Subscription {
    return this.audioService.canplay$.subscribe(fn);
  }

  attachPause(fn: (ev: Event) => void): Subscription {
    return this.audioService.pause$.subscribe(fn);
  }

  attachEnded(fn: (ev: Event) => void): Subscription {
    return this.audioService.ended$.subscribe(fn);
  }

  attachError(fn: OnErrorEventHandlerNonNull): Subscription {
    return this.audioService.error$.subscribe(fn);
  }

}
