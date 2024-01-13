import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Router } from "@angular/router";
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getAccessToken();

    if (token) {
      const authReq = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

      return next.handle(authReq).pipe(
        catchError((error) => {
          // Check if the error is due to an expired token
          if (error.status === 401) {
            const refreshToken = this.authService.getRefreshAccessToken();
            // If refresh token is available, attempt to refresh the access token
            if (refreshToken) {
              return this.authService.refreshAccessToken(refreshToken).pipe(
                switchMap((refreshResponse) => {
                  // If refresh is successful, update the access token and retry the original request
                  this.authService.setAccessToken(refreshResponse.access_token);
                  const newToken = this.authService.getAccessToken();

                  const newAuthReq = request.clone({
                    setHeaders: {
                      Authorization: `Bearer ${newToken}`
                    }
                  });

                  return next.handle(newAuthReq);
                }),
                catchError((refreshError) => {
                  this.authService.clearTokens();
                  this.router.navigate(['/login']);
                  return throwError(refreshError);
                })
              );
            } else {
              this.authService.clearTokens();
              this.router.navigate(['/login']);
            }
          }
          return throwError(error);
        })
      );
    } else {
      return next.handle(request);
    }
  }
}
