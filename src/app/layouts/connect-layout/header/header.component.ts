import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../../../shared/services/users.service';
import { JwtService } from '../../../../shared/services/jwt.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private JwtService: JwtService, private router: Router) {}

  goToHome() {
    this.router.navigate(['/']);
  }

  logout() {
    this.JwtService.clearTokens();
    this.router.navigate(['/welcome']);
  }

  myaccount() {
    this.router.navigate(['/myaccount']);
  }
}
