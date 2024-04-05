import { Component } from '@angular/core';
import { UsersService } from '../../../../shared/services/users.service';
import { Router } from '@angular/router';
import { CreateUserDto } from '../../../../shared/models/users.module';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email = '';
  password = '';

  constructor(private usersService: UsersService, private router: Router) {}

  register() {
    const newUser: CreateUserDto = { email: this.email, password: this.password };

    this.usersService.createUser(newUser).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);
        this.router.navigate(['/blog']);
      },
      error: (error) => console.error('Registration failed:', error)
    });
  }
}
