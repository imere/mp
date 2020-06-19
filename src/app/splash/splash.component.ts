import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/services/config.service';
import { SplashConfig } from 'src/config/splash';

import { splashAnimate } from './animation';
import { splashStyle } from './style';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
  providers: [ConfigService],
  animations: [
    splashStyle,
    splashAnimate,
  ],
})
export class SplashComponent implements OnInit {
  state: 'show' | 'hide' = 'show';

  splashConfig: SplashConfig;

  constructor(private config: ConfigService) {
    this.splashConfig = this.config.getSplashConfig();
    this.state = this.shouldShow() ? 'show' : 'hide';
  }

  ngOnInit(): void {
    this.animate();
  }

  shouldShow(): boolean {
    return this.splashConfig.show;
  }

  animate(): void {
    setTimeout(() => {
      this.state = 'hide';
    });
  }
}
