import { trigger, state, animate, transition, style } from '@angular/animations';
 
export const fadeInOutAnimation =
    // trigger name for attaching this animation to an element using the [@triggerName] syntax
    trigger('fadeInOutAnimation', [
         state('*', style({
             opacity: 1,
             backgroundColor: 'rgba(0, 0, 0, 0.8)'
         })),

        // route 'enter' transition
        transition(':enter', [
 
            // css styles at start of transition
            style({ opacity: '0', height:'0px' }),
 
            // animation and styles at end of transition
            animate('2.5s', style({ opacity: '1', height: '1000px' }))
        ]),
         transition(':leave', [
 
            // css styles at start of transition
            style({ opacity: '1', height: '1000px' }),
 
            // animation and styles at end of transition
            animate('2.5s', style({ opacity: '0', height: '0px' }))
        ]),
    ]);