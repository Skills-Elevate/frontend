import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { catchError, switchMap, finalize } from 'rxjs/operators';
import { Router } from "@angular/router";
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private refreshing = false;

  constructor(private authService: AuthService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getAccessToken();

    if (token) {
      request = this.addToken(request, token);
    }

    return next.handle(request).pipe(
      catchError((error) => this.handle401Error(request, next, error)),
      finalize(() => {
        // Reset refreshing flag after each request
        this.refreshing = false;
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler, error: any) {
    if (error instanceof HttpErrorResponse && error.status === 401) {
      const refreshToken = this.authService.getRefreshAccessToken();

      if (refreshToken && !this.refreshing) {
        this.refreshing = true;

        return from(this.authService.refreshAccessToken(refreshToken)).pipe(
          switchMap((refreshResponse) => {
            this.authService.setAccessToken(refreshResponse.access_token);

            const newRequest = this.addToken(request, refreshResponse.access_token);

            return next.handle(newRequest).pipe(
              catchError((newError) => this.handleNewError(newError))
            );
          }),
          catchError((refreshError) => this.handleRefreshError(refreshError))
        );
      } else {
        this.handleTokenError();
        return throwError('Refresh token is not available or already refreshing.');
      }
    }

    return throwError(error);
  }

  private handleTokenError() {
    this.authService.clearTokens();
    this.router.navigate(['/login']);
  }

  private handleNewError(newError: any) {
    if (newError.status === 401 && newError.error?.expiredAt) {
      this.router.navigate(['/home']);
    } else {
      this.handleTokenError();
    }
    return throwError(newError);
  }

  private handleRefreshError(refreshError: any) {
    if (refreshError.status === 401 && refreshError.error?.expiredAt) {
      this.router.navigate(['/home']);
    } else {
      this.handleTokenError();
    }
    return throwError(refreshError);
  }

  private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
