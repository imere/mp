import { state, style, trigger } from '@angular/animations';

export const coverStyle = trigger('coverStyle',
  [
    state('*',
      style({
        width: '{{width}}',
        height: '{{height}}',
        backgroundColor: '{{backgroundColor}}',
        objectPosition: '{{objectPosition}}',
        objectFit: '{{objectFit}}',
      }),
      {
        params: {
          width: 'initial',
          height: 'initial',
          backgroundColor: 'initial',
          objectPosition: 'initial',
          objectFit: 'initial',
        },
      },
    ),
  ],
);