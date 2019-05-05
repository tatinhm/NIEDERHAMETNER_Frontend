import { Component, OnInit, Input } from '@angular/core';
import {Book} from "../shared/book";


@Component({
  selector: 'a.bs-book-list-item', // a. bedeutet dass es sich um eine Klasse handelt
  templateUrl: './book-list-item.component.html',
  styles: []
})
export class BookListItemComponent implements OnInit {
  @Input() book: Book;  //property binding //@input hier darf ich ein property reingeben
  constructor() { }

  ngOnInit() {
  }

}
