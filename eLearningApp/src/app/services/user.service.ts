import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../models';

@Injectable({ providedIn: 'root' })
export class UserService {
    
    rootUrl: string = "http://localhost:44337/api";
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(this.rootUrl + '/Users');
    }

    getById(id: number) {
        return this.http.get(this.rootUrl + '/users/' + id);
    }

    register(user: User) {
        return this.http.post(this.rootUrl + '/Users/register', user);
    }

    update(user: User) {
        return this.http.put(this.rootUrl + '/Users/' + user.id, user);
    }

    delete(id: number) {
        return this.http.delete(this.rootUrl + '/Users/' + id);
    }

    userAuthentication(userName, password) {
        var data = "username=" + userName + "&password=" + password + "&grant_type=password";
        var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded','No-Auth':'True' });
        return this.http.post<any>('http://localhost:44337' + '/token', data, { headers: reqHeader });
      }

      getUserClaims(){
        return  this.http.get(this.rootUrl+'/api/GetUserClaims');
       }

       logout() {
        localStorage.removeItem('access-token')    
    }
}