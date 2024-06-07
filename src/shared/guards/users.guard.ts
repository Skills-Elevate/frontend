import { Injectable, inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { JwtService } from "../services/jwt.service";

@Injectable({
  providedIn: 'root',
})
export class UsersGuard {
  JwtService = inject(JwtService);
  router = inject(Router);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const url = state.url;

    if (!this.JwtService.getAccessToken()) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}

