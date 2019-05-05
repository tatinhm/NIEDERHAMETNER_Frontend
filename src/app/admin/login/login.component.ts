import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../shared/authentication-service";

//kommt bei der LoginMethode zurück
interface Response{
    response : string;
    result: {
        token: string;
    }
}

@Component({
    selector: 'bs-login',
    templateUrl: './login.component.html',
    styles: []
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;

    constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {

    }

    ngOnInit() {
        this.loginForm = this.fb.group({
            username: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        })
    }

    login(){
        const val = this.loginForm.value;
        if(val.username && val.password){
            this.authService.login(val.username, val.password).subscribe(res =>  {
                const resObj = res as Response; //Response ist unser Interface
                if(resObj.response === 'success'){
                  this.authService.setLocalStorage(resObj.result.token);
                }
            })
        }
    }

    isLoggedIn() {
        return this.authService.isLoggedIn();
    }

    logout() {
        return this.authService.logout();
    }
}
