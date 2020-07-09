import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {OrderListPageModule} from "./pages/order-list/order-list-page.module";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/main/main.module').then(m => m.MainPageModule)
  },
  {
    path: 'order-list',
    loadChildren: () => import('./pages/order-list/order-list-page.module').then(m => OrderListPageModule)
  },
  {
    path: 'order-map',
    loadChildren: () => import('./pages/order-map/order-map.module').then(m => m.OrderMapPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
