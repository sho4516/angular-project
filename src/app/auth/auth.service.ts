import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, catchError, Subject, tap, throwError } from "rxjs";
import { User } from "./auth/user.model";

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

    user = new BehaviorSubject<User>(null);
    tokenExpirationTimer : any;
    

    constructor(private http: HttpClient, private router: Router) { }

    signUp(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDg1HCmnuYS4X23UFEDZS-G4apHpj1jgYA',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }).pipe(catchError(this.handleError), 
            tap(resData => {
                this.handleAuthentication(resData.email, resData.localId, resData.idToken, resData.expiresIn);
            }));
    }

    login(email: string, password: string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDg1HCmnuYS4X23UFEDZS-G4apHpj1jgYA',
        {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError),  tap(resData => {
            this.handleAuthentication(resData.email, resData.localId, resData.idToken, resData.expiresIn);
        })
        );
    }

    autoLogin(){
        const user:{
            'email': string,
            'id': string,
            '_token': string,
            '_tokenExpirationDate': string
        } = JSON.parse(localStorage.getItem('userdata'));

        if(!user){
            return;
        }

        const loadedUser = new User(user.email, user.id, user._token, new Date(user._tokenExpirationDate));
        if(loadedUser.token){
            this.user.next(loadedUser);
            const expirationDuration = new Date(user._tokenExpirationDate).getTime() - new Date().getTime()
            this.autoLogout(expirationDuration);
        }
    }

    logout(){
        this.user.next(null);
        localStorage.clear();
        this.router.navigate(['/auth']);
        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    autoLogout(expirationDuration: number){
        this.tokenExpirationTimer =  setTimeout(( ) => {
            this.logout();
        }, expirationDuration)
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An Unknown Error occured';
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorRes);
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'Email already exists';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'Email does not exist'
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'Wrong Password';
                break;
        }
        return throwError(() => new Error(errorMessage));
    }

    private handleAuthentication(email: string, id: string, token: string, expiresIn: string) {
        const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
        const user = new User(email, id, token, expirationDate);
        this.user.next(user);
        this.autoLogout(+expiresIn * 1000);
        localStorage.setItem('userdata', JSON.stringify(user));
    }

}