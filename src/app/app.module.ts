//Alle Teile, aller Elemente werden hier zusammengefasst
//Alles was verwendet wir, muss hier registriert sein
//module = klasse

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { AppComponent } from './app.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookListItemComponent } from './book-list-item/book-list-item.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookStoreService} from "./shared/book-store.service";
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from "./app-routing.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { BookFormComponent } from './book-form/book-form.component';
import { LoginComponent } from './admin/login/login.component';
import {AuthService} from "./shared/authentication-service";
import {TokenInterceptorService} from "./shared/token-interceptor.service";
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ShoppingCartItemComponent } from './shopping-cart-item/shopping-cart-item.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderListItemComponent } from './order-list-item/order-list-item.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderDetailItemComponent } from './order-detail-item/order-detail-item.component';
import { OrderlogItemComponent } from './orderlog-item/orderlog-item.component';

@NgModule({
    declarations: [
        AppComponent,
        BookListComponent,
        BookListItemComponent,
        BookDetailsComponent,
        HomeComponent,
        BookFormComponent,
        LoginComponent,
        ShoppingCartComponent,
        ShoppingCartItemComponent,
        OrderListComponent,
        OrderListItemComponent,
        OrderDetailComponent,
        OrderDetailItemComponent,
        OrderlogItemComponent
    ],
    imports: [
        BrowserModule, FormsModule, AppRoutingModule, HttpClientModule, ReactiveFormsModule
    ],
    providers: [
        BookStoreService, AuthService, {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptorService,
            multi: true //es können mehrere Services gleichzeitig laufen
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }