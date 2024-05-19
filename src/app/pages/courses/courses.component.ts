import { AuthService } from "../../../shared/services/auth.service";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Course } from "../../../shared/models/course.module";
import { Router } from "@angular/router";
import { CoursesService } from "../../../shared/services/courses.service";
import { map, startWith, switchMap } from "rxjs/operators";
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses$!: Observable<Course[]>;
  filteredCourses$!: Observable<Course[]>;
  isCoach$: Observable<boolean> | undefined;
  searchQuery: FormControl = new FormControl('');

  constructor(
    private coursesService: CoursesService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isCoach$ = this.authService.isUserCoach();
    this.isCoach$.subscribe(isCoach => {
      if (isCoach) {
        this.courses$ = this.coursesService.getCoursesOnlyCoach();
      } else {
        this.courses$ = this.coursesService.getCourses();
      }
      this.filteredCourses$ = this.courses$.pipe(
        switchMap(courses =>
          this.searchQuery.valueChanges.pipe(
            startWith(''),
            map(query =>
              courses.filter(course =>
                course.name.toLowerCase().includes(query.toLowerCase())
              )
            )
          )
        )
      );
    });
  }

  joinCourse(courseId: string) {
    this.router.navigate(['/course', courseId]);
  }

  editCourse(courseId: string) {
    this.router.navigate(['/course/edit', courseId]);
  }

  addCourse() {
    this.router.navigate(['/courseadd']);
  }
}
