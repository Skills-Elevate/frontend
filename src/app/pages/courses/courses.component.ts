import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router'; // Importe Router
import { Course } from "../../../shared/models/course.module";
import { CoursesService } from "../../../shared/services/courses.service";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses$!: Observable<Course[]>;

  constructor(private coursesService: CoursesService, private router: Router) { }

  ngOnInit() {
    this.courses$ = this.coursesService.getCourses();
  }

  goTo(courseId: string) {
    this.router.navigate(['/course', courseId]);
  }
}
