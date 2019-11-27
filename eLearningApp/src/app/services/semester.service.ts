import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserRoleMapping } from '../models/userRoleMapping';
import { Semester } from '../models/semester.model';

@Injectable({ providedIn: 'root' })

export class SemesterService {
    
    rootUrl: string = "http://localhost:44337/api";
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Semester[]>(this.rootUrl + '/Semesters');
    }

    getById(id: number) {
        return this.http.get(this.rootUrl + '/Semesters/' + id);
    }

    add(semester: Semester) {
        return this.http.post(this.rootUrl + '/Semesters', semester);
    }
    update(semester: Semester) {
        return this.http.put(this.rootUrl + '/Semesters/' + semester.semesterid, semester);
    }

    delete(id: number) {
        return this.http.delete(this.rootUrl + '/Semesters/' + id);
    }
}