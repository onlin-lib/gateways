import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes : Routes = [
    {
      path: '',
      redirectTo : 'gateways',
      pathMatch : 'full'
    },
    {
        path: 'gateways',
        loadChildren : () => import('./modules/gateways/gateways.module').then((m) => m.GatewaysModule)
    }
  ]

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}
