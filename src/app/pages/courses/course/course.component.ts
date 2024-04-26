import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Course } from '../../../../shared/models/course.module';
import { CoursesService } from '../../../../shared/services/courses.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  course$!: Observable<Course>; // Modifier pour correspondre au type retourné par getCourseById

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService
  ) {}

  ngOnInit() {
    this.course$ = this.route.paramMap.pipe(
      switchMap(params => {
        const courseId = params.get('id');
        if (!courseId) {
          throw new Error('Course ID is required');
        }
        return this.coursesService.getCourseById(courseId);
      })
    );
  }
}
