import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { CoursesService } from '../../../../shared/services/courses.service';
import { AuthService } from '../../../../shared/services/auth.service';
import { Course } from "../../../../shared/models/course.module";

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  course$!: Observable<Course>;
  isCoach$!: Observable<boolean>;  // Utilisation de '!'

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService,
    private authService: AuthService
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

    this.isCoach$ = this.authService.getUserRole().pipe(
      map(role => role === 'Coach')
    );
  }

  goTo(courseId: string) {
    console.log('Navigating to course:', courseId);
  }

  chatWithInstructor() {
    alert('Commencer à discuter avec le professeur!');
  }
}
