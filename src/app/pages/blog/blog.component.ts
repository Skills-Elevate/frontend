import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../../shared/services/users.service';
import { AuthService } from '../../../shared/services/auth.service';
import { UserI } from '../../../shared/models/users.module';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  users: UserI[] = [];

  constructor(private usersService: UsersService, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.usersService.findAllUsers().subscribe(
      response => {
        this.users = response;
      },
      error => console.error('login failed:', error)
    );
  }

  logout() {
    this.authService.clearTokens();
    this.router.navigate(['/']);
  }
}
