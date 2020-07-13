import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {AuthGuard} from "./providers/guards/auth.guard";

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: "full"
  },
  {
    path: 'operator',
    loadChildren: () => import ('./pages/operator/operator.module')
      .then(m => m.OperatorModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import ('./pages/auth/auth.module')
      .then(m => m.AuthModule)
  },
  { path: '**', redirectTo: '/auth/login' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
