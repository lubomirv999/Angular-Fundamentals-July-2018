import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegisterModel } from './models/register.model';
import { LoginModel } from './models/login.model';

const appKey = "kid_S1tMi8s4X" // APP KEY HERE;
const appSecret = "80c85580ff6448b7b6b5ab9accd4d5cb" // APP SECRET HERE;
const registerUrl = `https://baas.kinvey.com/user/${appKey}`;
const loginUrl = `https://baas.kinvey.com/user/${appKey}/login`;
const logoutUrl = `https://baas.kinvey.com/user/${appKey}/_logout`;


@Injectable()
export class AuthService {
    private currentAuthtoken: string;

    private createAuthHeaders(type: string) {
        if (type === 'Basic') {
            return new HttpHeaders({
                'Authorization': `Basic ${btoa(`${appKey}:${appSecret}`)}`,
                'Content-Type': 'application/json'
            });
        } else {
            return new HttpHeaders({
                'Authorization': `Kinvey ${localStorage.getItem('authtoken')}`,
                'Content-Type': 'application/json'
            });
        }
    }

    register(model: RegisterModel) {
        return this.http.post(
            registerUrl,
            JSON.stringify(model),
            {
                headers: this.createAuthHeaders('Basic')
            });
    }

    login(model: LoginModel) {
        return this.http.post(
            loginUrl,
            JSON.stringify(model), {
                headers: this.createAuthHeaders('Basic')
            });
    }

    logout() {
        return this.http.post(
            logoutUrl,
            {},
            {
                headers: this.createAuthHeaders('Kinvey')
            });
    }

    checkIfLogged() {
        return this.currentAuthtoken === localStorage.getItem('authtoken');
    }

    get authtoken() {
        return this.currentAuthtoken;
    }

    set authtoken(value: string) {
        this.currentAuthtoken = value;
    }

    constructor(private http: HttpClient) { }
}