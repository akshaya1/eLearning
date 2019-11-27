import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../models';
import { UserService } from '../services';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { RoleService } from '../services/role.service';
import { Role } from '../models/role';
import { Router } from '@angular/router';
import { UserRoleMappingService } from '../services/userrolemapping.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  currentUser: any;
  users: User[] = [];
  roles : Role[] = [];
  role : any;
  

  constructor(
      private userService: UserService,
      private toastrService : ToastrService,
      private roleService : UserRoleMappingService,
      private router : Router
  ) {
        this.userService.getUserClaims().subscribe((user: any) => {
        this.currentUser = user;
        this.roleService.getById(this.currentUser.userid).pipe(first()).subscribe((roles : any) => {
          this.role = roles[0];
          localStorage.setItem('role',JSON.stringify(this.role.roleid))
      });
        localStorage.setItem('user',JSON.stringify(this.currentUser))
      });

      this.roleService.getAll().subscribe((roles : any[]) => {
        this.roles = roles;
    });
 
  }

  ngOnInit() {
      this.loadAllUsers();
      this.userService.getUserClaims().subscribe((user: any) => {
        this.currentUser = user;
        this.roleService.getById(this.currentUser.userid).subscribe((roles : any) => {
          this.role = roles;      
          localStorage.setItem('role',JSON.stringify(this.role))
    
      });
        localStorage.setItem('user',JSON.stringify(this.currentUser))
      });

      this.roleService.getAll().subscribe((roles : any[]) => {
        this.roles = roles;
    });
  }


  deleteUser(id: number) {
      this.userService.delete(id).pipe(first()).subscribe(() => {
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

  editRole(userid : any)
  {
    this.router.navigate(['/editrole',userid])
  }

}
