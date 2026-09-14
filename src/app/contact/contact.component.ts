import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class ContactComponent implements OnDestroy {
  public form: FormGroup;
  public formSubmitted: boolean;
  public spinnerDisplay: boolean;
  public formSubmitError: boolean;

  private submit$: Subscription;

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient, private router: Router) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)]],
      fullName: ['', [Validators.required]],
      message: ['', [Validators.required]],
    });
  }

  public ngOnDestroy() {
    this.submit$?.unsubscribe();
  }

  // Submit the form
  public submitForm() {
    this.spinnerDisplay = true;
    this.formSubmitError = false;

    if (this.form.get('email')?.errors || this.form.get('message')?.errors || this.form.get('fullName')?.errors) {
      setTimeout(() => {
        this.formSubmitted = true;
        this.spinnerDisplay = false;
      }, 1300);
    } else {
      this.formSubmitted = true;
      this.submit$?.unsubscribe();
      this.submit$ = this.httpClient.post<{ name?: string }>('https://submit-form.com/2UXU5Lf3', {
        email: this.form.get('email')?.value,
        name: this.form.get('fullName')?.value,
        message: this.form.get('message')?.value,
      }).subscribe((res) => {
        setTimeout(() => {
          if (res.name) {
            this.spinnerDisplay = false;
            this.formSubmitted = false;

            this.form.get('email')?.setValue('');
            this.form.get('message')?.setValue('');
            this.form.get('fullName')?.setValue('');

            this.router.navigateByUrl('/contact/success');
          } else {
            this.formSubmitError = true;
          }
        }, 1300);
      });
    }
  }
}
