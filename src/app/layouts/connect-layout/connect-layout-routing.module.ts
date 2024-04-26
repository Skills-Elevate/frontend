import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnectLayoutComponent } from './connect-layout.component';
import { ProfileComponent } from "../../pages/profile/profile.component";
import { CoursesComponent } from "../../pages/courses/courses.component";
import { ChannelComponent } from '../../pages/channel/channel.component';

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
