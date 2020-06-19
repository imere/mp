import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackgroundComponent } from './background.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [BackgroundComponent],
  imports: [
    SharedModule,
    BrowserAnimationsModule
  ],
  exports: [BackgroundComponent]
})
export class BackgroundModule { }
