import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/models/course.model';
import { FileToUploadResponse } from 'src/app/models/fileuploadresponse.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-createcourse',
  templateUrl: './createcourse.component.html',
  styleUrls: ['./createcourse.component.css']
})
export class CreatecourseComponent implements OnInit {

  courseForm: FormGroup;
  fileToUpload: File = null;
  course : Course = new Course();
  progress: number;
  message: string;
  fileUploadResponse : FileToUploadResponse[] = [];

  semesters : any[] = [
    {
      semesterid : 1,
      semestername : '1st semester'
    },
    { semesterid : 2,
      semestername : '2nd semester'
    },
    { semesterid : 3,
      semestername : '3rd semester'
    }
  ]
  successFlag: number = 0;;
  

  constructor(
    private formBuilder: FormBuilder,
    private courseService : CourseService,
    private toastrService : ToastrService,
    private route : Router
  ) { }

  ngOnInit() {

    this.fileUploadResponse = [];

    this.courseForm = this.formBuilder.group({
      semesterid:['',Validators.required],
      coursename:['',Validators.required],
      attachment: ['', Validators.required]
  });
  }

  get f() { return this.courseForm.controls; }


createCourse() {
  this.course.coursename = this.courseForm.value.coursename;
  this.course.semesterid = this.courseForm.value.semesterid;
  this.fileUploadResponse.forEach((fileUpload:any) => {
    this.course.attachment = fileUpload.FileAsByteArray
    this.course.filename = fileUpload.FileName
    debugger;
    this.courseService.add(this.course).subscribe(data => {
      // do something, if upload success
      this.toastrService.success('course added succesfully')
      }, error => {
        console.log(error);
      });
  });
  this.route.navigate(['/courselist'])
}

receiveMessage($event) {
  this.fileUploadResponse.push($event)
}



}
