import { trigger, transition, style, animate } from "@angular/animations";

export const fadeAnimation = trigger('fadeAnimation', [
  transition(
    ':enter', [
      style({ opacity: 0 }),
      animate('0.25s ease-out', style({ opacity: 1 }))
  ]),
  transition(
    ':leave', [
      style({ opacity: 1 }),
      animate('0.25s ease-in', style({ opacity: 0 }))
  ])
]);

export const slideMenuAnimation = trigger('slideMenuAnimation', [
  transition(':enter', [
    style({ opacity: 1, transform: 'translateX(100%)' }),
    animate(
      "0.3s cubic-bezier(0.64, 0.4, 0.12, 0.97)",
      style({
        transform: "translateX(0%)",
        opacity: 1,
      })
    )
  ]),
  transition(':leave', [
    style({ opacity: 1, transform: 'translateX(0%)' }),
    animate(
      "0.3s cubic-bezier(0.64, 0.4, 0.12, 0.97)",
      style({
        transform: "translateX(100%)",
        opacity: 1,
      })
    )
  ])
]);
