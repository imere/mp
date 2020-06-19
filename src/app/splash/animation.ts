import { animate, state, style, transition, trigger } from '@angular/animations';

export const splashAnimate = trigger('splashAnimate', [
  state('show', style({
    opacity: 1,
  })),
  state('hide', style({
    opacity: 0,
    pointerEvents: 'none',
  })),
  transition('show => hide', [
    animate('{{duration}} {{delay}}'),
  ]),
]);