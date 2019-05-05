import {Injectable} from '@angular/core';
import {isNullOrUndefined} from "util";
import {HttpClient} from "@angular/common/http";
import * as decode from 'jwt-decode';
import {retry} from 'rxjs/operators';

//npm install --save-dev jwt-decode

interface User {
    result: {
        created_at: Date,
        email: string,
        id: number,
        firstName: string,
        lastName: string,
        admin: number,
        address: string,
        updated_at: Date
    }
}

@Injectable()
export class AuthService {

    private api:string = 'http://bookstore19.s1610456024.student.kwmhgb.at/api/auth';//'http://localhost:8080/api/auth';

    constructor(private http: HttpClient) {
    }

    login(email: string, password: string ) {
        return this.http.post(`${this.api}/login`, {'email': email, 'password': password});
    }

//ich schicke JWT Token an Server, dort wird der Nutzer kontrolliert ob in DB
//Result -> aktueller User wird im Local Storage gespeichert
    public setCurrentUserId(){
        this.http.get<User>(`${this.api}/user`).pipe(retry(3)).subscribe(res =>{
                localStorage.setItem('userId', res.result.id.toString());
            }
        );
    }

    public getCurrentUserId(){
        return Number.parseInt(localStorage.getItem('userId'));
    }

    public setLocalStorage(token: string) {
        console.log("Storing token");
        console.log(token);
        const decodedToken = decode(token);
        console.log(decodedToken);
        console.log(decodedToken.user.id);
        localStorage.setItem('token', token);
        localStorage.setItem('userId', decodedToken.user.id);
        localStorage.setItem('admin', decodedToken.user.admin);
        localStorage.setItem('userAddress', decodedToken.user.address);
    }

    //Löscht Daten aus dem Local Storage
    logout() {
        this.http.post(`${this.api}/logout`, {});
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("admin");
        localStorage.removeItem("userAddress")
        console.log("logged out");
        console.log(localStorage);
    }

    //ist ein aktueller Token da
    public isLoggedIn() {
        if(!isNullOrUndefined(localStorage.getItem("token"))){
            let token : string  = localStorage.getItem("token");
            const decodedToken = decode(token);
            let expirationDate:Date = new Date(0);
            expirationDate.setUTCSeconds(decodedToken.exp);
            if(expirationDate < new Date()){
                console.log("token expired");
                localStorage.removeItem("token");
                return false;
            }
            return true;
        } else {
            return false;
        }
    }

    public isAdmin(){
        let admin = Number.parseInt(localStorage.getItem('admin'));
        if(this.isLoggedIn()){
            if(admin == 1){
                return true;
            }
            return false;
        }
        return false;
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

}