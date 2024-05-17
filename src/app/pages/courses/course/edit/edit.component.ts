import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoursesService } from "../../../../../shared/services/courses.service";
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from "../../../../../shared/services/auth.service";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  editForm: FormGroup;
  courseId: string | null | undefined;

  constructor(
    private fb: FormBuilder,
    private coursesService: CoursesService,
    private authService: AuthService,  // Inject AuthService
    private router: Router,  // Inject Router for redirection
    private route: ActivatedRoute
  ) {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      imageUrl: [''],
      price: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.courseId = params.get('id');
      if (this.courseId) {
        this.loadCourseDetails();
      } else {
        console.error('No course ID provided');
        this.router.navigate(['/']);  // Redirect to home if no courseId
      }
    });
  }

  loadCourseDetails() {
    this.coursesService.getCourseById(this.courseId!).subscribe({
      next: (course) => {
        console.log('Course details', course);
        if (course.authorId !== this.authService.getUserId()) {
          console.error('Unauthorized access attempt to course');
          this.router.navigate(['/']);  // Redirect to home if not authorized
        } else {
          this.editForm.patchValue({
            name: course.name,
            description: course.description,
            imageUrl: course.imageUrl,
            price: course.price
          });
        }
      },
      error: (err) => {
        console.error('Failed to load course', err);
        this.router.navigate(['/']);  // Redirect on error
      }
    });
  }

  onSubmit() {
    if (this.editForm.valid) {
      console.log('Form Value', this.editForm.value);
      this.coursesService.updateCourse(this.courseId, this.editForm.value).subscribe({
        next: (response) => console.log('Course updated', response),
        error: (err) => console.error('Update failed', err)
      });
    }
  }
}
