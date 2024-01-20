import { Injectable, inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { JwtService } from "../services/jwt.service";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  JwtService = inject(JwtService);
  router = inject(Router);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const url = state.url;

    if (!this.JwtService.getAccessToken()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}

