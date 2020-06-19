import { Component, OnInit } from '@angular/core';
import { CoverConfig } from 'src/config/cover';
import { ConfigService } from 'src/services/config.service';
import { coverStyle } from './style';

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.scss'],
  animations: [coverStyle]
})
export class CoverComponent implements OnInit {
  coverConfig: CoverConfig;

  constructor(private config: ConfigService) {
    this.coverConfig = this.config.getCoverConfig();
  }

  ngOnInit(): void { }

  onCoverError(ev: Event) { }
}
