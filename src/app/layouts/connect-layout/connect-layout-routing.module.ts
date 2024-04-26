import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnectLayoutComponent } from './connect-layout.component';
<<<<<<< Updated upstream
import { ProfileComponent } from "../../pages/profile/profile.component";
import { CoursesComponent } from "../../pages/courses/courses.component";
import { ChannelComponent } from '../../pages/channel/channel.component';
=======
import { BlogComponent } from "../../pages/blog/blog.component";
import {ProfileComponent} from "../../pages/profile/profile.component";
import {CoursesComponent} from "../../pages/courses/courses.component";
import {CourseComponent} from "../../pages/courses/course/course.component";
>>>>>>> Stashed changes

const routes: Routes = [
  {
    path: '',
    redirectTo: 'courses',
    pathMatch: 'full'
  },
  {
    path: '',
    component: ConnectLayoutComponent,
    children: [
      {
        path: 'courses',
        component: CoursesComponent,
      },
      {
<<<<<<< Updated upstream
        path: 'channel/:id',
        component: ChannelComponent,
=======
        path: 'course/:id',
        component: CourseComponent,
>>>>>>> Stashed changes
      },
      {
        path: 'profile',
        component: ProfileComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConnectLayoutRoutingModule { }
