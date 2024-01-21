import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersGuard } from '../shared/guards/users.guard';
import { AuthGuard } from "../shared/guards/auth.guard";
import { NotFoundComponent } from "./pages/not-found/not-found.component";

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('./layouts/connect-layout/connect-layout.module').then((m) => m.ConnectLayoutModule)
  },
  {
    path: '',
    canActivate: [UsersGuard],
    loadChildren: () => import('./layouts/public-layout/public-layout.module').then((m) => m.PublicLayoutModule)
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
