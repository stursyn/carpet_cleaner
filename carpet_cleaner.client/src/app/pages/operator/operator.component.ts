import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {AuthUser} from "../../models/auth-user";
import {NbMenuService} from "@nebular/theme";
import {filter, map} from "rxjs/operators";

@Component({
  selector: 'app-operator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.scss']
})
export class OperatorComponent implements OnInit {

  userMenu = [ { title: 'logout' } ];
  user:AuthUser;
  constructor(private nbMenuService:NbMenuService,
              private authService:AuthService) {
    this.user = this.authService.currentUserValue;
  }

  ngOnInit(): void {
    this.nbMenuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'user-context-menu'),
        map(({ item: { title } }) => title),
      )
      .subscribe(title => {
        switch (title) {
          case 'logout':
            this.authService.logout();
            break;
        }
      });

  }

}
