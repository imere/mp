import { state, style, trigger } from '@angular/animations';

export const backgroundAnimate = trigger('backgroundAnimate',
  [
    state('show',
      style({
        backgroundImage: 'url({{image}})',
        backgroundColor: '{{color}}',
        backgroundPositionX: '{{x}}',
        backgroundPositionY: '{{y}}',
        backgroundSize: '{{size}}',
        backgroundRepeat: '{{repeat}}',
      }),
      {
        params: {
          image: 'none',
          color: 'initial',
          x: 'initial',
          y: 'initial',
          size: 'initial',
          repeat: 'no-repeat',
        },
      },
    ),
    state('hide',
      style({
        backgroundImage: 'none',
        backgroundColor: 'initial',
      }),
    ),
  ],
);