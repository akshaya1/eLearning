import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models';
import { UserService } from '../services';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  currentUser: User;
  
  constructor(private router: Router,
    private userService : UserService
) {}
  ngOnInit() {
  }

  logout() {
    this.userService.logout();
    localStorage.removeItem('user')
    localStorage.removeItem('role')
    this.router.navigate(['/login']);
}

}
