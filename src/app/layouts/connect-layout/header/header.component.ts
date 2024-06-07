import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from "../../../../shared/services/auth.service";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  isDesktop: boolean = false;
  showMenu: boolean = false; // Ajoutez cette variable

  constructor(
    private authService: AuthService,
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe(status => {
      this.isLoggedIn = status;
      this.cdRef.detectChanges();
    });

    this.breakpointObserver.observe([Breakpoints.Handset])
      .subscribe(result => {
        this.isDesktop = !result.matches;
      });
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  goToHome() {
    this.toggleMenu(); // Ferme le menu
    this.router.navigate(['/']);
  }

  gotToCourse() {
    this.toggleMenu(); // Ferme le menu
    this.router.navigate(['/courses']);
  }

  goToProfile() {
    this.toggleMenu(); // Ferme le menu
    this.router.navigate(['/profile']);
  }

  logout() {
    this.toggleMenu(); // Ferme le menu
    this.authService.logout();
    this.cdRef.detectChanges();
    this.router.navigate(['/welcome']);
  }

  goToLogin() {
    this.toggleMenu(); // Ferme le menu
    this.router.navigate(['/login']);
  }
}
