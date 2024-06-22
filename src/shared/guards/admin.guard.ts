import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isAdmin().pipe(
      tap(isAdmin => {
        console.log('AdminGuard: Checking if user is admin', isAdmin);
        if (!isAdmin) {
          console.warn('AdminGuard: User is not an admin, redirecting to home');
          this.router.navigate(['/']);
        }
      }),
      map(isAdmin => isAdmin),
    );
  }
}
