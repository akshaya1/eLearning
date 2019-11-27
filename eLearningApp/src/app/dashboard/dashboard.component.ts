import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models';
import { UserService } from '../services';
import { Result } from './result';
import { DataService } from '../services/data.serevice';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  currentUser: User;
  sliderArray: object[];
  transform: number;
  selectedIndex = 0;
  
  constructor(
    private router: Router,
    private userService : UserService,
    private data: DataService
    ) {
      this.sliderArray = [];
      this.selectedIndex = 0;
      this.transform = 100;
    }
  ngOnInit() {
    this.sliderArray = this.data.getData();
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
}

selected(x) {
  this.downSelected(x);
  this.selectedIndex = x;
 }

 keySelected(x) {
  this.downSelected(x);
  this.selectedIndex = x;
}

 downSelected(i) {
 this.transform =  100 - (i) * 50;
   this.selectedIndex = this.selectedIndex + 1;
   if (this.selectedIndex > 4) {
     this.selectedIndex = 0;
   }
 }

}
