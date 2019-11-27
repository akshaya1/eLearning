import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-courselist',
  templateUrl: './courselist.component.html',
  styleUrls: ['./courselist.component.css']
})
export class CourselistComponent implements OnInit {
  allCourses: any[] = [];
  role : any;

  constructor(
    private courseService : CourseService,
    private router : Router,
    private toastrService : ToastrService
  ) { 
    this.loadAllCourses();

    this.role = JSON.parse(localStorage.getItem('role'))

  }

  ngOnInit() {
    
    this.loadAllCourses();
    this.role = JSON.parse(localStorage.getItem('role'))

  }

  loadAllCourses() {
    this.courseService.getAll().subscribe(  
      (data : any) => {  
       this.allCourses = data;
      }  
    );
  }

  addCourse(){
    this.router.navigate(['/addcourse'])
  }


}
