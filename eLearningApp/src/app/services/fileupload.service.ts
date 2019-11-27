import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../models';
import { Role } from '../models/role';
import { FileToUpload } from '../models/filetoupload.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FileUploadService {
    
    
    constructor(private http: HttpClient) { }

    uploadFile(theFile: FileToUpload) : Observable<any> {

        const API_URL = "http://localhost:44337/api/Upload";
        const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
        return this.http.post(API_URL, theFile, httpOptions);
      }
 
}