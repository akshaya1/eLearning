import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserRoleMapping } from '../models/userRoleMapping';

@Injectable({ providedIn: 'root' })

export class UserRoleMappingService {
    
    rootUrl: string = "http://localhost:44337/api";
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<UserRoleMapping[]>(this.rootUrl + '/userRoleMappings');
    }

    getById(userid: number) {
        return this.http.get(this.rootUrl + '/userRoleMappings?userid=' + userid);
    }

    add(userRoleMapping: UserRoleMapping) {
        return this.http.post(this.rootUrl + '/userRoleMappings', userRoleMapping);
    }
    update(userRoleMapping: UserRoleMapping) {
        return this.http.put(this.rootUrl + '/userRoleMappings/' + userRoleMapping.userid, userRoleMapping);
    }

    delete(id: number) {
        return this.http.delete(this.rootUrl + '/userRoleMappings/' + id);
    }
}