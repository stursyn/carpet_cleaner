import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  error: string = null;
  messages: string[] = [];
  user: any = {};
  submitted: boolean = false;
  returnUrl: string;

  constructor(private authService:AuthService,
              private route:ActivatedRoute,
              protected cd: ChangeDetectorRef,
              private router:Router) {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/main/order-list'], {relativeTo:this.route.root});
    }
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login(form: any) {
    this.error = null;
    let data = form.form.value;
    this.authService.authorize(data.username, data.password)
      .then(() => {
        this.router.navigate(['/main/order-list'], {relativeTo:this.route.root});
        this.cd.detectChanges();
      })
      .catch( reason =>  {
        this.error =  reason.body;
        this.cd.detectChanges();
      });
  }
}