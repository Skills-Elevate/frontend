import { Component } from '@angular/core';
import { AuthService } from '../../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { CreateUserDto } from '../../../../shared/models/users.module';

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
    const credentials: CreateUserDto = { email: this.email, password: this.password };

    this.authService.login(credentials).subscribe(
      response => {
        console.log(response);
        this.authService.handleLoginResponse(response);
        this.router.navigate(['/courses']);
      },
      error => console.error('login failed:', error)
    );
  }
}
