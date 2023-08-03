import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payement',
  templateUrl: './payement.component.html'
})
export class PayementComponent implements OnInit {
  public invoiceNumber: number;
  public invoiceCurrency: string;
  public invoiceAmount: number;
  public theme = localStorage.getItem('theme');

  constructor(private route: ActivatedRoute, private router: Router) {
    // Get route invoice number & amount
    this.route.params.subscribe(params => this.invoiceNumber = params.id);
    this.route.queryParams.subscribe(params => {
      this.invoiceAmount = params.amount;
      this.invoiceCurrency = params.currency;
    })
  }

  public ngOnInit(): void {
    // If no amount or invoice number, redirect
    if(!this.invoiceAmount || !this.invoiceNumber || !this.invoiceCurrency) this.router.navigateByUrl('/')
  }
}