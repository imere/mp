import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { PlayerComponent } from './player.component';
import { ControlsComponent } from './controls/controls.component';
import { CoverComponent } from './cover/cover.component';
import { TrackComponent } from './track/track.component';
import { ListComponent } from './list/list.component';
import { SettingsComponent } from './settings/settings.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    PlayerComponent,
    CoverComponent,
    ControlsComponent,
    TrackComponent,
    ListComponent,
    SettingsComponent
  ],
  imports: [
    SharedModule,
    FontAwesomeModule
  ],
  exports: [PlayerComponent]
})
export class PlayerModule { }
