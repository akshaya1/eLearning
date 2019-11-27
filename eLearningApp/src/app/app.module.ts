import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './materal.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import { WelcomeComponent } from './welcome/welcome.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AlertComponent } from './alert/alert.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatDialogModule, MatButtonModule } from '@angular/material';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthInterceptor } from './guards/auth.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { CourseComponent } from './course/course/course.component';
import { CourselistComponent } from './course/courselist/courselist.component';
import { CreatecourseComponent } from './course/createcourse/createcourse.component';
import { RolesComponent } from './roles/roles.component';
import { FileuploadComponent } from './fileupload/fileupload.component';  
import { FileSaverModule } from 'ngx-filesaver';
import { createCustomElement } from '@angular/elements';



@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    DashboardComponent,
    AlertComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    CourseComponent,
    CourselistComponent,
    CreatecourseComponent,
    RolesComponent,
    FileuploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    ToastrModule.forRoot(),
    FileSaverModule
  ],
  entryComponents: [DashboardComponent],
  providers: [ {  provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
 }],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
    const slider = createCustomElement(DashboardComponent, { injector });
    customElements.define('motley-slider', slider);
  }
}
