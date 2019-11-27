import { Component, OnInit, Input } from '@angular/core';
import { Course } from 'src/app/models/course.model';
import { CourseService } from 'src/app/services/course.service';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  @Input() public courses : Course;

  constructor(
    private courseService : CourseService
  ) { }

  ngOnInit() {
  }

  download(){
    this.courseService.getPDF(this.courses.filename).subscribe(res =>{
      debugger;
      let file = new Blob([res], { type: 'application/pdf' });            
      FileSaver.saveAs(file, this.courses.filename);
    });
  }

}
