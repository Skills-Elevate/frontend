import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnectLayoutComponent } from './connect-layout.component';
import { BlogComponent } from "../../pages/blog/blog.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'blog',
    pathMatch: 'full'
  },
  {
    path: '',
    component: ConnectLayoutComponent,
    children: [
      {
        path: 'blog',
        component: BlogComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConnectLayoutRoutingModule { }
