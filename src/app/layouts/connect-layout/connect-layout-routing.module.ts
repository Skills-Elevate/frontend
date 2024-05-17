import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnectLayoutComponent } from './connect-layout.component';
import { ProfileComponent } from "../../pages/profile/profile.component";
import { CoursesComponent } from "../../pages/courses/courses.component";
import { ChannelComponent } from '../../pages/channel/channel.component';
import { BlogComponent } from "../../pages/blog/blog.component";
import {EditComponent} from "../../pages/courses/course/edit/edit.component";
import {AddCourseComponent} from "../../pages/courses/course/add-course/add-course.component";
import {CourseComponent} from "../../pages/courses/course/course.component";


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
        path: 'channel/:id',
        component: ChannelComponent,
      },
      {
        path: 'course/:id',
        component: CourseComponent,
      },
      {
        path: 'course/edit/:id',
        component: EditComponent,
      },
      {
        path: 'courseadd',
        component: AddCourseComponent,
      },
      {
        path: 'blog',
        component: BlogComponent,
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
