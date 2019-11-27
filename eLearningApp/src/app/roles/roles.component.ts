import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRoleMappingService } from '../services/userrolemapping.service';
import { Role } from '../models/role';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from '../services';
import { RoleService } from '../services/role.service';
import { UserRoleMapping } from '../models/userRoleMapping';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  id: number;
  private sub: any;
  userrole : UserRoleMapping = new UserRoleMapping()
  role : Role = new Role()
  roleForm: FormGroup;
  user: any;
  roles : any[];
  userroleMapping: UserRoleMapping = new UserRoleMapping();


  constructor(
    private route : ActivatedRoute,
    private userRoleMappingService : UserRoleMappingService,
    private formBuilder: FormBuilder,
    private router: Router,
    private userService : UserService,
    private roleService : RoleService,
    private toastrService : ToastrService
  ) { 
   
    this.getDetails();

  }

  ngOnInit() {
    this.roleForm = this.formBuilder.group({
      username:['',Validators.required],
      roleid: ['', Validators.required]
  });

   //get selected user
   this.userService.getById(this.id).pipe().subscribe((user:any)=> {
      this.user = user
   });

   //get all the roles
   this.roleService.getAll().subscribe((roles:any[])=>{
     this.roles = roles;

   });
  }

  get f() { return this.roleForm.controls; }

  editRole(){
    this.userroleMapping.roleid = this.roleForm.value.roleid;
    this.userroleMapping.userid = this.user.userid;
    this.userRoleMappingService.update(this.userroleMapping).subscribe((data:any)=>{
      this.userrole = data;
      this.toastrService.success('role changed successfully!!')
    })

    this.getDetails();
  }

  getDetails()
  {
    this.route.params.subscribe(params => {
      this.id = +params['userid']; // (+) converts string 'id' to a number
      this.userRoleMappingService.getById(this.id).pipe().subscribe((data:UserRoleMapping)=> {
          this.userrole = data;
          this.roleService.getById(this.userrole.roleid).pipe().subscribe((role:Role)=>{
              this.role = role;
          });        
      });
   });
  }

}
