import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { AppRoutingModule } from './app-routing.module';
import { BlogComponent } from './pages/blog/blog.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { environment } from '../shared/environments/environment.dev';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from '../shared/interceptors/jwt.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NgOptimizedImage } from '@angular/common';
import { ChannelComponent } from './pages/channel/channel.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CourseComponent } from './pages/courses/course/course.component';
import { EditComponent } from './pages/courses/course/edit/edit.component';
import { MatIconModule } from "@angular/material/icon";
import { AddCourseComponent } from "./pages/courses/course/add-course/add-course.component";
import { HeaderModule } from '../shared/components/header/header.module';
import { AdminComponent } from './pages/admin/admin.component';
import { NgChartsModule } from 'ng2-charts';
import { MatGridListModule } from "@angular/material/grid-list";
import {LayoutAdminComponent} from "./pages/admin/layout/layout.component";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    BlogComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    ProfileComponent,
    CoursesComponent,
    ChannelComponent,
    CourseComponent,
    EditComponent,
    AddCourseComponent,
    AdminComponent,
    LayoutAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: `registerWhenStable:${environment.apiPort}`,
    }),
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    NgOptimizedImage,
    MatToolbarModule,
    HeaderModule,
    NgChartsModule,
    MatGridListModule,
    MatSidenavModule,
    MatListModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
