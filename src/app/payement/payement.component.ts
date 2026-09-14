import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-payement',
  templateUrl: './payement.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class PayementComponent implements OnInit, OnDestroy {
  public invoiceNumber: number;
  public invoiceCurrency: string;
  public invoiceAmount: number;
  public theme = localStorage.getItem('theme');

  private params$: Subscription;
  private queryParams$: Subscription;

  constructor(private route: ActivatedRoute, private router: Router) {
    // Get route invoice number & amount
    this.params$ = this.route.params.subscribe((params) => this.invoiceNumber = params.id);
    this.queryParams$ = this.route.queryParams.subscribe((params) => {
      this.invoiceAmount = params.amount;
      this.invoiceCurrency = params.currency;
    });
  }

  public ngOnInit(): void {
    // If no amount or invoice number, redirect
    if (!this.invoiceAmount || !this.invoiceNumber || !this.invoiceCurrency) this.router.navigateByUrl('/');
  }

  public ngOnDestroy() {
    this.params$?.unsubscribe();
    this.queryParams$?.unsubscribe();
  }
}
