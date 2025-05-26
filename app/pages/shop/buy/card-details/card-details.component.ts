import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.css']
})
export class CardDetailsComponent {
 card: any;

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    this.card = nav?.extras?.state?.['card'];
    if (!this.card) this.router.navigate(['/']);
  }
}
