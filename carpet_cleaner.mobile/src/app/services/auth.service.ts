import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {BehaviorSubject, Observable, throwError} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthUser} from "../models/auth-user";
import {Role} from "../models/role";

@Injectable({
    providedIn: "root"
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<AuthUser>;
  currentUser: Observable<AuthUser>;

  private apiPoint: string = 'auth';
  constructor(private api:ApiService,
              private router:Router,
              private route:ActivatedRoute) {
    this.currentUserSubject = new BehaviorSubject<AuthUser>(JSON.parse(sessionStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  get currentUserValue(): AuthUser {
    return this.currentUserSubject.value;
  }

  authorize(username, password) {
    let endPoint = this.apiPoint + '/authorize';

    return this.api.post(endPoint, {login: username, password: password}).toPromise()
      .then(user => {
        user.role = Role[user.role];

        this.verify(user);

        return user;
      });
  }

  logout() {
    if (!this.currentUserValue) {
      return;
    }

    let endPoint = this.apiPoint + '/signOut';

    this.api.post(endPoint, null).toPromise()
      .then(res => {
        this.unVerify();
        this.router.navigate(['/login'], {relativeTo:this.route.root});
      });
  }

  private verify(user: AuthUser) {
    sessionStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  public unVerify() {
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
