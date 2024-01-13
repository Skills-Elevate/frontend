import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtService } from "../services/jwt.service";

@Injectable({
  providedIn: 'root',
})
export class UsersGuard implements CanActivate {

  constructor(private JwtService: JwtService, private router: Router) {}

  canActivate(): boolean {
    if (this.JwtService.getAccessToken()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
