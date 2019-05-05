import { Component, OnInit, Input } from '@angular/core';
import {Book} from "../shared/book";

@Component({
    selector: 'a.bs-shopping-cart-item',
    templateUrl: './shopping-cart-item.component.html',
    styles: []
})
export class ShoppingCartItemComponent implements OnInit {

    @Input() book: any;
    constructor() { }

    ngOnInit() {
    }

    /**
     * @desc deletes Item from ShoppingCart in the localStorage
     * @param Book book - the book I want to delete
     * */
    deleteItemFromShoppingCart(book : Book){
        let shoppingCart = JSON.parse(localStorage.getItem('cart'));
        if(shoppingCart) {
            for (let i = 0; i < shoppingCart.length; i++) {
                if(book.isbn == shoppingCart[i].book.isbn){
                    shoppingCart.splice(Number(i), 1);
                    localStorage.setItem('cart', JSON.stringify(shoppingCart));
                }
            }
            window.location.reload();
        }

        console.log(localStorage);
    }

    /**
     * @desc increases the amount of books and price in the shoppingcart
     * @param Book book - the book which amount increases
     * */
    amountPlus(book : Book){
        let shoppingCart = JSON.parse(localStorage.getItem('cart'));
        if(shoppingCart) {
            for (let i = 0; i < shoppingCart.length; i++) {
                if(book.isbn == shoppingCart[i].book.isbn){
                    book.bruttoPrice /= shoppingCart[i].amount;
                    shoppingCart[i].amount ++;
                    let price = book.bruttoPrice * shoppingCart[i].amount;
                    shoppingCart[i].book.bruttoPrice = price.toFixed(2);
                    localStorage.setItem('cart', JSON.stringify(shoppingCart));
                }
            }
            window.location.reload();
        }
    }

    /**
     * @desc decreases the amount of books and price in the shoppingcart
     * @param Book book - the book which amount decreases
     * */
    amountMinus(book : Book){
        let shoppingCart = JSON.parse(localStorage.getItem('cart'));
        if(shoppingCart) {
            for (let i = 0; i < shoppingCart.length; i++) {
                if(book.isbn == shoppingCart[i].book.isbn){
                    if(shoppingCart[i].amount > 1){
                        book.bruttoPrice /= shoppingCart[i].amount;
                        shoppingCart[i].amount --;
                        let price = book.bruttoPrice * shoppingCart[i].amount;
                        console.log(book.bruttoPrice);
                        shoppingCart[i].book.bruttoPrice = price.toFixed(2);
                    }
                    else this.deleteItemFromShoppingCart(book);
                }
            }
            localStorage.setItem('cart', JSON.stringify(shoppingCart));
            window.location.reload();
        }
    }
}
