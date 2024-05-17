import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Course } from '../../../../shared/models/course.module';
import { CoursesService } from '../../../../shared/services/courses.service';
import { ChannelsService } from '../../../../shared/services/channels.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  course$!: Observable<Course>;
  courseId?: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private coursesService: CoursesService,
    private channelsService: ChannelsService
  ) {}

  ngOnInit() {
    this.course$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.courseId = params.get('id') ?? '';
        if (!this.courseId) {
          throw new Error('Course ID is required');
        }
        return this.coursesService.getCourseById(this.courseId);
      })
    );
  }

  joinCourseChannel(channelId: string) {
    // Vérifier si un canal existe déjà pour ce cours
    this.channelsService.findOne(channelId).subscribe({
      next: (data) => {
        if (data) {
          // S'il existe déjà un channel, rediriger vers ce channel
          this.router.navigate(['/channel', channelId]);
        } else {
          // S'il n'existe pas de canal, créer un nouveau canal
          this.channelsService.create({ courseId: this.courseId }).subscribe({
            next: (response) => {
              console.log(response); // Gérez la réponse réussie, si nécessaire
            },
            error: (error) => {
              console.error(error); // Gérez les erreurs, si nécessaire
            }
          });
        }
      },
      error: (error) => {
        console.error(error); // Gérez les erreurs, si nécessaire
      }
    });
  }
}
