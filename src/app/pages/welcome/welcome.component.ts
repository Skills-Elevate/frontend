import {Component, OnInit, inject, ChangeDetectorRef} from '@angular/core';
import { Router } from '@angular/router';
import {CoursesService} from "../../../shared/services/courses.service";
import {PostsService} from "../../../shared/services/posts.service";
import {PostI} from "../../../shared/models/posts.module";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  router = inject(Router);

  constructor(private postsService: PostsService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {

  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
