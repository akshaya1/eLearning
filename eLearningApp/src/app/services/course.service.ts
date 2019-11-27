import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Course } from '../models/course.model';

@Injectable({ providedIn: 'root' })
export class CourseService {
 
    
    rootUrl: string = "http://localhost:44337/api";
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<any[]>(this.rootUrl + '/Cours');
    }

    getById(id: number) {
        return this.http.get(this.rootUrl + '/Cours/' + id);
    }
    add(course: Course) {
        return this.http.post(this.rootUrl + '/Cours', course);
    }
    update(course: Course) {
        return this.http.put(this.rootUrl + '/Cours/' + course.courseid, course);
    }

    delete(id: number) {
        return this.http.delete(this.rootUrl + '/Cours/' + id);
    }

    getPDF(filename : string) {
        const httpOptions = {
             'responseType'  : 'blob' as 'json'
          }; 
          return this.http.get<any>(this.rootUrl + '/Cours?filename='+ filename, httpOptions);          
    }
}