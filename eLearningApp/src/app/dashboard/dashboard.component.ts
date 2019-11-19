import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models';
import { UserService } from '../services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  currentUser: User;
  
  constructor(private router: Router,
    private userService : UserService) {}
  ngOnInit() {
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
}

}