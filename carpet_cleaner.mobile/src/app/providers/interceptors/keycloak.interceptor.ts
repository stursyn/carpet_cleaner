import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from "../../services/auth.service";

@Injectable()
export class KeycloakInterceptor implements HttpInterceptor {

  constructor(private authService:AuthService) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if(this.authService.currentUserValue?.token)  {
      const authReq = request.clone({
        headers: request.headers.set('Content-Type', 'application/json')
          .set("Authorization","Bearer " + this.authService.currentUserValue.token)
      });
      return next.handle(authReq);
    }

    return next.handle(request);
  }

}
