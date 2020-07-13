import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {getDeepFromObject, NB_AUTH_OPTIONS} from "@nebular/auth";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  submitted: boolean = false;
  returnUrl: string;


  constructor(private authService:AuthService,
              private route: ActivatedRoute,
              @Inject(NB_AUTH_OPTIONS) protected options = {},
              protected cd: ChangeDetectorRef,
              protected router: Router) {

    console.log(this.authService.currentUserValue);

    if (this.authService.currentUserValue) {
      this.router.navigate(['/operator/startPage'], {relativeTo:this.route.root});
    }

  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login(): void {
    this.errors = [];
    this.messages = [];
    this.submitted = true;

    this.authService.authorize(this.user.username, this.user.password)
      .then(() => {
        this.router.navigate(['/operator/startPage'], {relativeTo:this.route.root});
        this.cd.detectChanges();
      })
      .catch( reason =>  {
        this.errors.push(reason.body);
        this.cd.detectChanges();
      })
      .finally(()=> {
        this.submitted = false;
      });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

}
