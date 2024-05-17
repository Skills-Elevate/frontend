import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CoursesService } from '../../../../shared/services/courses.service';
import { AuthService } from '../../../../shared/services/auth.service';
import { Course } from "../../../../shared/models/course.module";
import { ChannelsService } from '../../../../shared/services/channels.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  course$!: Observable<Course>;
  isCoach$!: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService,
    private channelsService: ChannelsService,
    private authService: AuthService,
    private router: Router
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

    this.isCoach$ = this.authService.isCoach();
  }

  joinCourseChannel(channelId: string | undefined) {
    if (channelId) {
      this.router.navigateByUrl(`/channel/${channelId}`);
    } else {
      const courseId = this.route.snapshot.paramMap.get('id');
      if (courseId) {
        this.channelsService.create({ courseId: courseId ?? undefined }).subscribe((createdChannel) => {
          const channelIdFromResponse = createdChannel.id;
          if (channelIdFromResponse) {
            this.router.navigateByUrl(`/channel/${channelIdFromResponse}`);
          }
        });
      }
    }
  }
}
