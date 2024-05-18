import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from "../../../../shared/services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(
    private authService: AuthService,
    private cdRef: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe(status => {
      this.isLoggedIn = status;
      this.cdRef.detectChanges();
    });
  }

  goToHome() {
    this.router.navigate(['/']);
  }

  profile() {
    this.router.navigate(['/profile']);
  }

  logout() {
    this.authService.logout();
    this.cdRef.detectChanges();
    this.router.navigate(['/welcome']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
