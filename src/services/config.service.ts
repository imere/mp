import { Injectable } from '@angular/core';
import { SplashConfig } from 'src/config/splash';
import { BackgroundConfig } from 'src/config/background';
import { CoverConfig } from 'src/config/cover';
import { MusicsDataConfig } from 'src/config/musics';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  constructor() {
    this.updateSplashConfig();
    this.updateBackgroundConfig();
    this.updateCoverConfig();
    this.updateMusicsConfig();
  }

  private splash: SplashConfig;

  private updateSplashConfig() {
    this.splash = require('../config/splash.config.ts').default;
  }

  getSplashConfig(): SplashConfig {
    return this.splash;
  }

  private background: BackgroundConfig;

  private updateBackgroundConfig() {
    this.background = require('../config/background.config.ts').default;
  }

  getBackgroundConfig(): BackgroundConfig {
    return this.background;
  }

  private cover: CoverConfig;

  private updateCoverConfig() {
    this.cover = require('../config/cover.config.ts').default;
  }

  getCoverConfig(): CoverConfig {
    return this.cover;
  }

  private musics: MusicsDataConfig;

  private updateMusicsConfig() {
    this.musics = require('../config/musics.config.ts').default;
  }

  getMusicsConfig(): MusicsDataConfig {
    return this.musics;
  }
}
