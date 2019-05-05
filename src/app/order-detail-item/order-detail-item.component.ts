import { Component, OnInit, Input } from '@angular/core';
import {Book} from "../shared/book";

@Component({
    selector: 'a.bs-order-detail-item',
    templateUrl: './order-detail-item.component.html',
    styles: []
})

export class OrderDetailItemComponent implements OnInit {

    @Input() book: Book;
    constructor() { }

    ngOnInit() {
    }

}
