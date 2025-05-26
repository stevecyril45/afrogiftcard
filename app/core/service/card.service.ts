import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private cards = [
    { cardNumber: '1234567890123456', balance: 15000, owner: 'Jamike Obikwelu' },
    { cardNumber: '9876543210987654', balance: 34000, owner: 'Chukwuka Emmanuel' },
  ];

  searchCard(cardNumber: string): Observable<any | null> {
    const found = this.cards.find(card => card.cardNumber === cardNumber);
    return of(found ? found : null);
  }
}