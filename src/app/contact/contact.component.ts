import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html'
})
export class ContactComponent {
  public form: FormGroup;
  public formSubmitted: boolean;
  public spinnerDisplay: boolean;
  public formSubmitError: boolean;

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient, private router: Router) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)]],
      fullName: ['', [Validators.required]],
      message: ['', [Validators.required]],
    });
  }

  // Submit the form
  public submitForm() {
    this.spinnerDisplay = true;
    this.formSubmitError = false;

    if(this.form.get('email')?.errors || this.form.get('message')?.errors || this.form.get('fullName')?.errors) {
      setTimeout(() => {
        this.formSubmitted = true;
        this.spinnerDisplay = false;
      }, 1300)
    } else {
      this.formSubmitted = true;
      this.httpClient.post('https://submit-form.com/2UXU5Lf3', {
        email: this.form.get('email')?.value,
        name: this.form.get('fullName')?.value,
        message: this.form.get('message')?.value
      }).subscribe((res: any) => {
        setTimeout(() => {
          if(res.name) {
            this.spinnerDisplay = false;
            this.formSubmitted = false;

            this.form.get('email')?.setValue('');
            this.form.get('message')?.setValue('');
            this.form.get('fullName')?.setValue('');

            this.router.navigateByUrl('/contact/success');
          } else {
            this.formSubmitError = true;
          }
        }, 1300)
      })
    }
  }
}
