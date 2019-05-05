import { Component } from '@angular/core';
import{Book} from "./shared/book";
import {AuthService} from "./shared/authentication-service";

//erste Komponente unserer Apllikation - erste anzeigbare Teil unserer Anwendung

@Component({
    selector: 'bs-root',
    templateUrl: './app.component.html',
    styles: []
})

export class AppComponent {

    constructor(private authService : AuthService){}

    isLoggedIn(){
        return this.authService.isLoggedIn();
    }

    isAdmin(){
        return this.authService.isAdmin();
    }



    getLoginLabel(){
        if(this.isLoggedIn()){
            return "Logout"
        }
        return "Login";
    }
}

