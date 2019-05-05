import {Component, OnInit, Input, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BookStoreService} from "../shared/book-store.service";
import {AuthService} from "../shared/authentication-service";
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import {Orderlog} from "../shared/orderlog";
import {OrderlogFactory} from "../shared/orderlog-factory";
import {OrderFactoryFactory} from "../shared/order-factory";

@Component({
    selector: 'a.bs-order-detail',
    templateUrl: './order-detail.component.html',
    styles: []
})

export class OrderDetailComponent implements OnInit {
    orderForm: FormGroup;
    order = OrderFactoryFactory.empty();
    orderlogs : Orderlog[];

    constructor(private bs: BookStoreService,
                private router: Router,
                private route: ActivatedRoute,
                private authService: AuthService,
                private fb: FormBuilder,) { }

    /**
     * @desc shows order
     * */
    ngOnInit() {
        const orderId = this.route.snapshot.params['id'];
        if(orderId){
            this.bs.getOrder(orderId).subscribe(
                o => {
                    this.order = o;
                    this.getOrder();
                }
            );
        }
        this.getOrder();
        this.bs.getOrderlogs(orderId).subscribe(
            res => this.orderlogs = res
        );
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

    getOrder(){
        const state =  this.order.state;
        let description;
        if(state == 0){
            description = "Wir haben Ihre Bestellung erhalten!"
        }
        else if(state == 1){
            description = "Ihre Zahlung ist eingegangen!"
        }
        else if(state == 2){
            description = "Ihre Bestellung wurde versandt!"
        }
        else if(state == 3){
            description = "Ihre Bestellung wurde storniert!"
        }

        this.orderForm = this.fb.group({
            state: this.order.state,
            description: description,
            commentAdmin: "",
            order_id: this.order.id,
            user_id: parseInt(localStorage.getItem('userId'))
        })
    }

    submitForm(){
        const orderlog: Orderlog = OrderlogFactory.fromObject(this.orderForm.value);
        console.log(orderlog);
        this.bs.updateOrder(orderlog).subscribe(
            res => {
                this.router.navigate(['./../orders'], { relativeTo: this.route });
            }
        )
    }
}
