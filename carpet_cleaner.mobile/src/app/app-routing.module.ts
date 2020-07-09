import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'main',
    loadChildren: () => import('./pages/main/main.module').then(m => m.MainPageModule)
  },
  {
    path: 'actions',
    loadChildren: () => import('./pages/action/action.module').then(m => m.ActionPageModule)
  },
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
  {
    path: 'done-orders',
    loadChildren: () => import('./pages/done-orders/done-orders.module').then( m => m.DoneOrdersPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
