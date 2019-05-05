import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bs-home',
  template: `
      <h1 class="ui dividing header">Büchershop</h1>
    <p>
      Willkommen im Buchshop!
    </p>      
      <button class="ui tiny green button labeled icon" [routerLink]="['./../books']">
              <i class="book icon"></i>Zu den Büchern</button>
      <br/>
      <button class="ui tiny orange button labeled icon" [routerLink]="['./../shoppingCart']">
          <i class="shop icon"></i>Zum Warenkorb</button>
  `,
  styles: []
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
