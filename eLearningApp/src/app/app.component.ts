import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {  UserService } from './services';
import { User } from './models';

@Component({ selector: 'app-root', templateUrl: 'app.component.html' })
export class AppComponent {
    currentUser: User;

    constructor(
        private router: Router,
        private userService : UserService
    ) {
    }

    logout() {
        this.userService.logout();
        this.router.navigate(['/login']);
    }
}