import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthService} from "../../services/auth.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private authService:AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      console.log(err)
      if (err.status === 401) {
        if(this.authService.currentUserValue) {
          this.authService.unVerify();
          this.authService.logout();
        }
        return;
      }

      let error = err.error;
      error = error || err.message || err.statusText;

      return throwError(error);
    }))
  }

}
