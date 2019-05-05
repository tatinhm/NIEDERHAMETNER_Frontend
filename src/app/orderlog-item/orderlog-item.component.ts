import { Component, OnInit, Input } from '@angular/core';
import {Orderlog} from "../shared/orderlog";

@Component({
  selector: 'a.bs-orderlog-item',
  templateUrl: './orderlog-item.component.html',
  styles: []
})
export class OrderlogItemComponent implements OnInit {

  @Input() orderlog : Orderlog;
  constructor() { }

  ngOnInit() {
  }

    getState(state) {
        switch (state) {
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
