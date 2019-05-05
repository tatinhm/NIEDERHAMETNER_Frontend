import { Component, OnInit, Input } from '@angular/core';
import {Order} from '../shared/order';

@Component({
    selector: 'a.bs-order-list-item',
    templateUrl: './order-list-item.component.html',
    styles: []
})
export class OrderListItemComponent implements OnInit {
    @Input() order : any;

    constructor() { }

    ngOnInit() {
    }

    getState(stateNumber) {
        switch (stateNumber) {
            case 0:
                return "offen";
            case 1:
                return "bezahlt";
            case 2:
                return "versandt";
            case 3:
                return "storniert";
        }
    }

}
