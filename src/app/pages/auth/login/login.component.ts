import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {AuthLoginDto} from "../../../../shared/models/users.module";
import {AuthService} from "../../../../shared/services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    const credentials: AuthLoginDto = { email: this.email, password: this.password };

    this.authService.login(credentials).subscribe({
      next: (response) => {
        this.authService.handleLoginResponse(response);
        this.router.navigate(['/admin']); // Redirect to admin if login is successful
      },
      error: (error) => console.error('login failed:', error)
    });
  }
}
