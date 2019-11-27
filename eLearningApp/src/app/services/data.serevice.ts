import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

const URL = 'C:\Users\Akash\Desktop\EIS\eLearningApp-master\eLearningApp-master\eLearningApp\src\assets\data.json';
@Injectable({
 providedIn: 'root'
})
export class DataService {

  data = {
    "sliderArray":[
     {"img": "http://bloquo.cc/img/works/1.jpg", "alt": "", "text": "Get Your Course material with one click"},
     {"img": "http://bloquo.cc/img/works/2.jpg", "alt": "",  "text": "Get Your Course material with one click"},
     {"img": "http://bloquo.cc/img/works/3.jpg", "alt": "", "text": "Get Your Course material with one click"},
     {"img": "http://bloquo.cc/img/works/4.jpg", "alt": "",  "text": "Get Your Course material with one click"},
     {"img": "http://bloquo.cc/img/works/5.jpg", "alt": "", "text": "Get Your Course material with one click"}
    ]
  }
 constructor(private http: HttpClient) {
 }

 getData() {
   return this.data.sliderArray;
 }
}