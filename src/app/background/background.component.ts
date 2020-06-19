import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/services/config.service';
import { BackgroundConfig } from 'src/config/background';

import { backgroundAnimate } from './animation';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss'],
  providers: [ConfigService],
  animations: [
    backgroundAnimate,
  ],
})
export class BackgroundComponent implements OnInit {
  state: 'show' | 'hide' = 'show';

  backgroundConfig: BackgroundConfig;

  constructor(private config: ConfigService) {
    this.backgroundConfig = this.config.getBackgroundConfig();
    this.state = this.shouldShow() ? 'show' : 'hide';
  }

  ngOnInit(): void {
  }

  shouldShow(): boolean {
    return this.backgroundConfig.show;
  }

}
