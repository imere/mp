import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SplashComponent } from './splash.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [SplashComponent],
  imports: [
    SharedModule,
    BrowserAnimationsModule
  ],
  exports: [SplashComponent]
})
export class SplashModule { }
