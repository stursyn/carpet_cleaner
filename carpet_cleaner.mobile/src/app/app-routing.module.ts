import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {OrderListPageModule} from "./order-list/order-list-page.module";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./main/main.module').then(m => m.MainPageModule)
  },
  {
    path: 'order-list',
    loadChildren: () => import('./order-list/order-list-page.module').then( m => OrderListPageModule)
  },
  {
    path: 'order-map',
    loadChildren: () => import('./order-map/order-map.module').then( m => m.OrderMapPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
