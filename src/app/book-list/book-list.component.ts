import { Component, OnInit, EventEmitter, Output } from '@angular/core'; //EventEmitter feuert Events
import { Book, Image, Author } from '../shared/book';
import {BookStoreService} from "../shared/book-store.service";

@Component({
  selector: 'bs-book-list',
  templateUrl: './book-list.component.html',
  styles: []
})
export class BookListComponent implements OnInit {

  books : Book[];

    constructor (private bs : BookStoreService){}

    ngOnInit() { //Wenn Component im index.html geladen wird
        this.bs.getAll().subscribe(
            res => this.books = res
        ); //ist jetzt Observer oder Observable
    }


}
