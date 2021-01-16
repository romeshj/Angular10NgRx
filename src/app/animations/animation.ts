import {
  state,
  trigger,
  animate,
  transition,
  style,
  query,
  keyframes
} from '@angular/animations';

export const fadeAnimation = trigger('fadeAnimation', [
  transition('* => *', [
    query(
      ':enter',
      [style({ opacity: 0 })],
      { optional: true }
    ),
    query(
      ':leave',
      [style({ opacity: 1 }), animate('2000ms ease', style({ opacity: 0 }))],
      { optional: true }
    ),
    query(
      ':enter',
      [style({ opacity: 0 }), animate('2000ms ease', style({ opacity: 1 }))],
      { optional: true }
    )
  ])
]);

export const fadeTextAnimation = trigger('fadeTextAnimation', [
  state('initial', style({
        backgroundColor: 'rgba(0,0,0,.5)',
		color: '#000',
		transform: 'translateX(-100px)',
		opacity : 0
      })),
      state('final', style({
        backgroundColor: '#ccc',  
		color: 'brown',
		transform: 'translateX(0)',
		opacity : 1
      })),
      transition('initial=>final', animate('1500ms')),
]);

export const slideInDivAnimation = trigger('slideInDivAnimation', [
  state('initial', style({
		transform: 'translateX(-100px)',
		opacity : 0
      })),
      state('final', style({
		transform: 'translateX(0)',
		opacity : 1
      })),
      transition('initial=>final', animate('1500ms')),
]);

export const scaleAnimation = trigger('scaleAnimation', [
  state('initial', style({
		transform: 'scale(0)',
		opacity : 0
      })),
      state('final', style({
		transform: 'scale(1)',
		opacity : 1
      })),
      transition('initial=>final', animate('1500ms')),
]);

export const pageLeftToRight = trigger('leftToRight', [
	 
    transition('* => *', [
      // Initial state of new route
      query(':enter',
        style({
          position: 'fixed',
          width: '100%',
		  opacity: 0,
          transform: 'translateX(-100%)'
        }), { optional: true }),
      // move page off screen right on leave
      query(':leave',
        animate('500ms ease',
          style({
            position: 'fixed',
            width: '100%',
			 opacity: 1,
            transform: 'translateX(100%)',
          })
        ), { optional: true }),
      // move page in screen from left to right
      query(':enter',
        animate('1000ms ease', keyframes([
			style({
            transform: 'translateX(-75%)',
            opacity: 0.25,
            offset: 0.2
          }),
          style({
            transform: 'translateX(-50%)',
            opacity: 0.5,
            offset: 0.6
          }),
          style({
            transform: 'translateX(-25%)',
            opacity: 0.75,
            offset: 0.85
          }),
          style({
            transform: 'translateX(0%)',
            opacity: 1,
            offset: 1
          })
		])
        ), { optional: true }),
    ])
])
