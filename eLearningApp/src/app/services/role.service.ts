import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../models';
import { Role } from '../models/role';

@Injectable({ providedIn: 'root' })
export class RoleService {
    
    rootUrl: string = "http://localhost:44337/api";
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<any[]>(this.rootUrl + '/Roles');
    }

    getById(id: number) {
        return this.http.get(this.rootUrl + '/Roles/' + id);
    }
    update(role: Role) {
        return this.http.put(this.rootUrl + '/Roles/' + role.roleid, role);
    }

    delete(id: number) {
        return this.http.delete(this.rootUrl + '/Roles/' + id);
    }
}