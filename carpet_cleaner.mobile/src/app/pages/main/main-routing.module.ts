import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainPage} from './main.page';
import {AuthGuard} from "../../providers/guards/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: MainPage,
    children: [
      {
        path: 'order-list',
        loadChildren: () => import('../order-list/order-list-page.module')
          .then(m => m.OrderListPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'order-map',
        loadChildren: () => import('../order-map/order-map.module')
          .then(m => m.OrderMapPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: '',
        redirectTo: '/main/order-list'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainPageRoutingModule {}
