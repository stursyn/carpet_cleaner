import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/operator',
    pathMatch: "full"
  },
  {
    path: 'operator',
    loadChildren: () => import ('./operator/operator.module')
      .then(m => m.OperatorModule)
  },
  { path: '**', redirectTo: '/operator' },
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
