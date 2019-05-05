import { Component, OnInit } from '@angular/core';
import {Order} from "../shared/order";
import {BookStoreService} from "../shared/book-store.service";
import {UrlSerializer} from "@angular/router";
import {User} from "../shared/user";
import {AuthService} from "../shared/authentication-service";

@Component({
  selector: 'bs-order-list',
  templateUrl: './order-list.component.html',
  styles: []
})
export class OrderListComponent implements OnInit {

  orders : Order[];
  userOrders : Order[];
  user : User;

  constructor(private bs : BookStoreService,
  private authService : AuthService) { }

    /**
     * @desc shows all orders in Database
     * */
  ngOnInit() {
      //if(this.isAdmin()) -- wenn isAdmin funktionieren würde
      this.bs.getOrders().subscribe(
          res => this.orders = res
      );
      //if(this.isLoggedIn() -- Ansicht für einzelnen User
        let userId = this.authService.getCurrentUserId();
        console.log(userId);
        this.bs.getUserOrders(userId).subscribe(
            res => this.userOrders = res
        );
  }

    isLoggedIn(){
        return this.authService.isLoggedIn();
    }

    isAdmin(){
        return this.authService.isAdmin();
    }

}
