import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {BookDetailsComponent} from './book-details/book-details.component';
import {BookListComponent} from './book-list/book-list.component';
import {HomeComponent} from './home/home.component';
import {BookFormComponent} from "./book-form/book-form.component";
import {LoginComponent} from "./admin/login/login.component";
import {ShoppingCartComponent} from "./shopping-cart/shopping-cart.component";
import {OrderListComponent} from "./order-list/order-list.component";
import {OrderDetailComponent} from "./order-detail/order-detail.component";


const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'books', component: BookListComponent},
    {path: 'books/:isbn', component: BookDetailsComponent},
    {path: 'admin', component: BookFormComponent},
    {path: 'admin/:isbn', component: BookFormComponent},
    {path: 'login', component: LoginComponent},
    {path: 'shoppingCart', component: ShoppingCartComponent},
    {path: 'orders', component: OrderListComponent},
    {path: 'orders/:id', component: OrderDetailComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})

export class AppRoutingModule {
}