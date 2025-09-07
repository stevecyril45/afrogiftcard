import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CardService } from 'app/core/service/card.service';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent {
  form = this.fb.group({
    cardNumber: ['', [Validators.required, Validators.minLength(16)]]
  });

  notFound = false;

  constructor(private fb: FormBuilder, private cardService: CardService, private router: Router) { }

  checkCard() {
    const cardNumber = this.form.value.cardNumber ?? '';

    this.cardService.searchCard(cardNumber).subscribe(card => {
      window.open('https://platform.afrogiftcard.com.ng', '_blank');
    });
  }

}
