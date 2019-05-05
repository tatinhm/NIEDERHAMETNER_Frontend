import {Component, OnInit, Input, Output} from '@angular/core';
import {Book} from "../shared/book";
import {ActivatedRoute, Router} from "@angular/router";
import {BookStoreService} from "../shared/book-store.service";
import {AuthService} from "../shared/authentication-service";

@Component({
    selector: 'bs-book-details',
    templateUrl: './book-details.component.html',
    styles: []
})
export class BookDetailsComponent implements OnInit {

    @Input() book : Book;

    constructor(
        private bs: BookStoreService,
        private router: Router,
        private route: ActivatedRoute,
        private authService: AuthService
    ){}

    ngOnInit() {
        //route gets separeted and saved in an array
        const params = this.route.snapshot.params;
        // b is the book, and is now an observeable
        this.bs.getSingle(params['isbn']).subscribe(
            b => this.book = b
        );
    }

    /**
     * @desc book is going to be removed from the database
     * */
    removeBook(){
        if (confirm("Buch wirklich löschen?")){
            this.bs.remove(this.book.isbn)
                .subscribe(res=> this.router.navigate(['../'], {relativeTo: this.route}));
        }
    }

    /**
     * @desc adds book to the shoppingCart via localStorage
     * */
    addToCart(){

        //create new Item
        let newItem={
            book : this.book,
            amount: 1,
        };
        let cart;
        //if there is no cart in the localStorage create a new array
        if (!localStorage.getItem('cart')) cart = [];
        //get cart from the localStorage and save it in an array
        else cart = JSON.parse(localStorage.getItem('cart'));
        if (!(cart instanceof Array)) cart = [];
        //check if the book is already in the shoppingCart
        let bookExists = false;
        for (let i = 0; i < cart.length; i++) {
            if(newItem.book.isbn === cart[i].book.isbn){
                bookExists = true;
                //change amaount of book, when book already exists in shoppingCart
                cart[i].amount++;
                let price = this.book.bruttoPrice * cart[i].amount;
                cart[i].book.bruttoPrice = price.toFixed(2);
                break;
            }
        }
        //push item in cart array when it doesn't already exist
        if(bookExists === false){
            cart.push(newItem);
        }
        //set array cart in localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log(localStorage);
    }

    getRating (num: number) {
        return new Array(num);
    }
}
