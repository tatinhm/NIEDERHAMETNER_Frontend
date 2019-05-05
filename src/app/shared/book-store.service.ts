import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { Observable, throwError} from "rxjs/index";
import { catchError, retry } from "rxjs/internal/operators";
import { Author, Book, Image } from "./book";
import { Order } from "./order";
import {Cart} from "./cart";
import { Orderlog} from "./orderlog";

@Injectable()

export class BookStoreService {
    //Pfad zur API
    private api = 'http://bookstore19.s1610456024.student.kwmhgb.at/api';
    books : Book[];
    cart : Cart[];

    constructor(private http: HttpClient) {}
    //HttpClient baut mir den Request zusammen und schickt ihn an den REST-Service

    // http client aufrufen mit Endpoint
    //nach drei mal keine Antwort -- catch Error -- Error wird ausgegeben
    //ErrorHandler ist enorm wichtig, weil es ja im Hintergrund läuft -- User würde es nicht mitkriegen, weil einfach nichts angezeigt werden würde

    getAll() : Observable<Array<Book>>{ //es wird ein Observeable zurück gegeben
        return this.http.get(`${this.api}/books`)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));
    }

    getSingle(isbn:string) : Observable<Book>{
        return this.http.get(`${this.api}/book/${isbn}`)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));
    }

    create(book : Book) : Observable<any> {
        return this.http.post(`${this.api}/book`, book)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));
    }

    update(book : Book) : Observable<any> {
        return this.http.put(`${this.api}/book/${book.isbn}`, book)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));
    }

    remove (isbn : string) : Observable<any> {
        return this.http.delete(`${this.api}/book/${isbn}`)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));
    }

    order (order : Order) : Observable<Order>{
        return this.http.post(`${this.api}/order`, order)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));
    }

    getOrders() : Observable<Array<Order>> {
        return this.http.get(`${this.api}/orders`)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));
    }

    getOrder(id : number) : Observable<Order> {
        return this.http.get(`${this.api}/orders/${id}`)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));
    }

    getUserOrders(userId : number) : Observable<Array<Order>> {
        return this.http.get(`${this.api}/orders/userId/${userId}`)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));
    }

    updateOrder(orderlog : Orderlog) : Observable<any>{
        return this.http.put(`${this.api}/order/${orderlog.order_id}`, orderlog)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));
    }

    getOrderlogs(orderId : number) : Observable<Array<Orderlog>>{
        return this.http.get(`${this.api}/order/orderlog/${orderId}`)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));
    }


    private errorHandler(error: Error | any) : Observable<any> {
        return throwError(error)
    }


}
