import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, UserService } from '../services';
import { ToastrService } from 'ngx-toastr';
import { RoleService } from '../services/role.service';

@Component({templateUrl: 'login.component.html'})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    role : any

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private alertService: AlertService,
        private userService : UserService,
        private toastrService : ToastrService,
        private roleService : RoleService
    ) {}

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        this.userService.userAuthentication(this.f.username.value, this.f.password.value)
        .pipe(first())
            .subscribe(
                data => {
                    if(data.access_token !=null)
                    {
                        this.toastrService.success("Login successfull!!",'Success');
                        localStorage.setItem('AccessToken',data.access_token);
                        this.router.navigate([this.returnUrl]);
                    }
                },
                error => {
                    this.toastrService.error("Login Failed!!", 'Error')
                    this.loading = false;
                });
    }
}
