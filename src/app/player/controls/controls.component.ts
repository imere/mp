import { Component, OnInit } from '@angular/core';
import {
  faPause as fasPause,
  faPlay as fasPlay,
  faStepBackward as fasStepBackward,
  faStepForward as fasStepForward
} from '@fortawesome/free-solid-svg-icons';
import { MusicService } from 'src/services/music.service';
import { IpcService } from 'src/services/ipc.service';
import { MP_APP_NAME } from 'shared/constants';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit {
  playButtonIcons = [fasPlay, fasPause];

  previousButton = fasStepBackward;

  nextButton = fasStepForward;

  constructor(private musicService: MusicService, private ipcService: IpcService) { }

  ngOnInit(): void {
    this.musicService.attachSwitchMusic(this.onSwitchMusic);
    this.musicService.attachPlay(this.onPlay);
    this.musicService.attachPause(this.onPause);
    this.musicService.attachEnded(this.onEnded);
  }

  isPlayButtonShown(): boolean {
    return this.playButtonIcons[1] === fasPlay;
  }

  togglePlayButton(): void {
    const { playButtonIcons } = this;
    playButtonIcons.unshift(playButtonIcons.pop());
  }

  play(index?: number): void {
    if (typeof index === 'number') {
      this.musicService.setCurMusic(index);
    } else {
      this.musicService.play(); 
    } 
  }

  pause(): void {
    this.musicService.pause();
  }

  togglePlayMusic(): void {
    if (this.musicService.isPlaying()) {
      this.pause();
    } else {
      this.play();
    }
  }

  previousMusic(): void {
    this.musicService.previous();
    this.play();
    this.notifyListBoundary({
      toTail: true
    });
  }

  nextMusic(): void {
    this.musicService.next();
    this.play();
    this.notifyListBoundary({
      toTail: false
    });
  }

  private onSwitchMusic = (): void => {
    if (this.musicService.isPlaying()) {
      this.togglePlayButton(); 
    }
  };

  private onPlay = (): void => {
    if (this.isPlayButtonShown()) {
      return; 
    }
    this.togglePlayButton();
  };

  private onPause = (): void => {
    if (this.isPlayButtonShown()) {
      this.togglePlayButton(); 
    }
  };

  private onEnded = (): void => {
    this.nextMusic();
  };

  private notifyListBoundary({ toTail }: { toTail: boolean; }): void {
    const info = this.musicService.getCurrentMusicWithInfo();
    if (info.index === info.length - 1) {
      this.ipcService.notify({
        title: MP_APP_NAME,
        body: toTail ? '回到第一首' : '回到最后一首'
      });
    }
  }

}
