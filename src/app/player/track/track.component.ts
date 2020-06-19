import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MusicService } from 'src/services/music.service';
import { formatSeconds } from 'shared/time-format';
import { clamp } from 'shared/clamp';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent implements OnInit {
  @ViewChild('track') track: ElementRef<HTMLElement>

  percentage = .0;

  currentTimeStr = '00:00';

  durationStr = '00:00';
  duration = .0

  hovering = false;
  dragging = false;

  constructor(private musicService: MusicService) { }

  ngOnInit(): void {
    this.musicService.attachTimeUpdate(this.onTimeUpdate);
    this.musicService.attachSwitchMusic(this.onSwitchMusic);
  }

  private onTimeUpdate = ({ currentTime, duration }): void => {
    if (this.dragging) {
      return; 
    }
    this.currentTimeStr = formatSeconds(currentTime);
    this.durationStr = formatSeconds(duration);
    this.duration = duration;
    this.percentage = currentTime / duration * 100;
  };

  private onSwitchMusic = (): void => {
    this.percentage = 0;
  };

  onPointerdown(ev: PointerEvent): void {
    this.dragging = true;
    this.track.nativeElement.setPointerCapture(ev.pointerId);
  }

  updatePercentage(ev: PointerEvent): void {
    const { x, width } = this.track.nativeElement.getBoundingClientRect();
    let { clientX } = ev;
    clientX = clamp(clientX, x, x + width);
    this.percentage = (clientX - x) / width * 100;
  }

  updateTip(time: number): void {
    this.currentTimeStr = formatSeconds(time);
  }
  
  onPointermove(ev: PointerEvent): void {
    if (!this.dragging) {
      return; 
    }
    this.updatePercentage(ev);
    this.updateTip(this.duration * this.percentage / 100);
  }

  updateTime(): void {
    this.musicService.updateTime(this.duration * this.percentage / 100);
  }
  
  onPointerup(ev: PointerEvent): void {
    this.dragging = false;
    this.track.nativeElement.releasePointerCapture(ev.pointerId);
    this.updateTime(); 
  }
}
