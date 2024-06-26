import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersGuard } from '../shared/guards/users.guard';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { ChannelComponent } from './pages/channel/channel.component';
import { CourseComponent } from './pages/courses/course/course.component';
import { EditComponent } from './pages/courses/course/edit/edit.component';
import { AddCourseComponent } from './pages/courses/course/add-course/add-course.component';
import { BlogComponent } from './pages/blog/blog.component';
import { ProfileComponent } from './pages/profile/profile.component';
import {GalerieComponent} from "./pages/galerie/galerie.component";
import { AdminComponent } from "./pages/admin/admin.component";
import { AdminGuard } from "../shared/guards/admin.guard";
import { AuthGuard } from "../shared/guards/auth.guard";
import { LayoutAdminComponent } from "./pages/admin/layout/layout.component";
import { AproposComponent } from "./pages/apropos/apropos.component";
import { MessagesComponent } from './pages/messages/messages.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
  },
  {
    canActivate: [UsersGuard],
    path: 'apropos',
    component: AproposComponent,
  },
  {
    canActivate: [UsersGuard],
    path: 'galerie',
    component: GalerieComponent,
  },
  {
    canActivate: [AuthGuard],
    path: 'courses',
    component: CoursesComponent,
  },
  {
    canActivate: [AuthGuard],
    path: 'messages',
    component: MessagesComponent,
  },
  {
    path: 'channel/:id',
    component: ChannelComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'course/:id',
    component: CourseComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'course/edit/:id',
    component: EditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'courseadd',
    component: AddCourseComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'blog',
    component: BlogComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [UsersGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [UsersGuard],
  },
  {
    path: 'admin',
    component: LayoutAdminComponent,
    canActivate: [AuthGuard, AdminGuard],
    children: [
      {
        path: '',
        component: AdminComponent
      },
      {
        path: 'courses',
        component: CoursesComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'blog',
        component: BlogComponent
      }
    ]
  },
  {
    path: '**',
    component: NotFoundComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
