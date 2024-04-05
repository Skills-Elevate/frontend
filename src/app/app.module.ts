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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from '../shared/interceptors/jwt.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { MyaccountComponent } from './pages/myaccount/myaccount.component';
import { CoursesComponent } from './pages/courses/courses.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    BlogComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    MyaccountComponent,
    CoursesComponent,
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
    ReactiveFormsModule
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
