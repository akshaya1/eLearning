import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../models';
import { UserService } from '../services';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  currentUser: User;
  users: User[] = [];

  constructor(
      private userService: UserService,
      private toastrService : ToastrService
  ) {
        this.userService.getUserClaims().subscribe((user: any) => {
        this.currentUser = user;
      });
  }

  ngOnInit() {
      this.loadAllUsers();
  }


  deleteUser(id: number) {
      this.userService.delete(id).pipe(first()).subscribe(() => {
          debugger;
          this.toastrService.success("Deleted Successfully!!",'Success');
          this.loadAllUsers()
      },
      error => {
          this.toastrService.error("Deletion Failed",'Error')
      });
  }

  private loadAllUsers() {
      this.userService.getAll().subscribe(users => {
          this.users = users;
      });
  }

}
