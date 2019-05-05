import {Component, OnInit, Input, Output} from '@angular/core';
import {Book} from "../shared/book";
import {ActivatedRoute, Router} from "@angular/router";
import {BookStoreService} from "../shared/book-store.service";
import {AuthService} from "../shared/authentication-service";
import {Order} from "../shared/order";
import {OrderFactoryFactory} from "../shared/order-factory";

@Component({
    selector: 'bs-shopping-cart',
    templateUrl: './shopping-cart.component.html',
    styles: []
})


export class ShoppingCartComponent implements OnInit {

    private books = [];
    private items = [];
    order = OrderFactoryFactory.empty();

    constructor(
        private bs : BookStoreService,
        private authService: AuthService) {
    }

    isLoggedIn(){
        return this.authService.isLoggedIn();
    }

    /**
     * @desc lists all books in the shoppingCart
     * */
    ngOnInit() {
        let shoppingCart = JSON.parse(localStorage.getItem('cart'));
        console.log(shoppingCart);
        if(shoppingCart) {
            for (let i = 0; i < shoppingCart.length; i++) {
                this.books[i] = shoppingCart[i];
            }
        }
    }

    /**
     * @desc deletes whole shoppingCart in localStorage
     * */
    deleteShoppingCart(){
        let shoppingCart = JSON.parse(localStorage.getItem('cart'));
        if(shoppingCart) {
            localStorage.removeItem('cart');
        }
    }

    getNettoPrice(){
        let shoppingCart = JSON.parse(localStorage.getItem('cart'));
        if(shoppingCart) {
            let nettoPrice = 0;
            for(let i = 0; i < shoppingCart.length; i++){
                nettoPrice += shoppingCart[i].book.nettoPrice * shoppingCart[i].amount;
            }
            return nettoPrice.toFixed(2);
        }
    }

    getBruttoPrice(){
        let shoppingCart = JSON.parse(localStorage.getItem('cart'));
        let bruttoPrice = 0;
        if(shoppingCart) {
            for (let i = 0; i < shoppingCart.length; i++) {
                shoppingCart[i].book.bruttoPrice /= shoppingCart[i].amount;
                bruttoPrice += shoppingCart[i].book.bruttoPrice * shoppingCart[i].amount;
                console.log(bruttoPrice);
            }
            return bruttoPrice.toFixed(2);
        }

    }

    /**
     * @desc save order in database
     * */
    saveOrder(){
        //get shoppingCart
        let shoppingCart = JSON.parse(localStorage.getItem('cart'));
        console.log(shoppingCart);
        if(shoppingCart) {
            for (let i = 0; i < shoppingCart.length; i++) {
                this.items[i] = shoppingCart[i].book;
            }
            this.order.books = this.items;
            console.log("book" + this.order.books);
            let nettoPrice = null;
            for (let i = 0; i < shoppingCart.length; i++) {
                nettoPrice += parseFloat(shoppingCart[i].book.nettoPrice);
            }
            console.log(nettoPrice);
            this.order.nettoPrice = nettoPrice.toFixed(2);
            let bruttoPrice = null;
            for (let i = 0; i < shoppingCart.length; i++) {
                bruttoPrice += parseFloat(shoppingCart[i].book.bruttoPrice);
            }
            console.log(bruttoPrice);
            this.order.bruttoPrice = bruttoPrice.toFixed(2);

            this.order.state = 0;

            this.order.user_id = Number.parseInt(localStorage.getItem('userId'));

            this.order.userAddress = JSON.stringify(localStorage.getItem('userAddress'));

            console.log(this.order);

            //save order in database and delete the shoppingCart in the localstorage
            this.bs.order(this.order).subscribe(
                res => {
                    this.deleteShoppingCart();
                    console.log('ORDER');
                }
            );
        }
    }
}
