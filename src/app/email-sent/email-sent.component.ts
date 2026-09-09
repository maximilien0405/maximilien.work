import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-email-sent',
    templateUrl: './email-sent.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class EmailSentComponent {

  constructor() { }
}
