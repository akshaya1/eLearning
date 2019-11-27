import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services';
import { UserRoleMappingService } from '../services/userrolemapping.service';
import { UserRoleMapping } from '../models/userRoleMapping';

@Component({templateUrl: 'register.component.html'})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    userRole : UserRoleMapping = new UserRoleMapping();

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private userService: UserService,
        private toastrService : ToastrService,
        private userRoleMappingService : UserRoleMappingService
        ) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.userService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                (data:any) => {
                    debugger;
                    this.toastrService.success("Registration successfull!!",'Success')
                    this.userRole.roleid = 3; // register new users as students
                    this.userRole.userid = data.userid;
                    this.userRole.isValid = 1;
                    this.userRoleMappingService.add(this.userRole).subscribe(data=>{
                    });
                    this.router.navigate(['/login']);
                },
                error => {
                    this.toastrService.error("Registration Failed",'Error')
                    this.loading = false;
                });
    }
}
