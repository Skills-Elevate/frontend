import {Component, OnInit, inject, ChangeDetectorRef} from '@angular/core';
import { Router } from '@angular/router';
import {Course} from "../../../shared/models/course.module";
import {CoursesService} from "../../../shared/services/courses.service";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  courses: Course[] = [];
  searchTerm = { name: '', category: '' };
  router = inject(Router);

  constructor(private coursesService: CoursesService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.coursesService.getCourses().subscribe(courses => {
      this.courses = courses;
    });
  }

  searchCourses() {
    console.log("Envoi de la recherche avec :", this.searchTerm);
    this.coursesService.getCoursesByQuery(this.searchTerm).subscribe(courses => {
      this.courses = courses;
    });
  }



  goToLogin() {
    this.router.navigate(['/login']);
  }
}
