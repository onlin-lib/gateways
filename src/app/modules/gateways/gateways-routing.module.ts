import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GatewayDetailsComponent } from './pages/gateway-details/gateway-details.component';
import { GatewaysComponent } from './pages/gateways/gateways.component';

export const routes : Routes = [
    {
        path: '',
        component : GatewaysComponent
    },
    {
        path: 'details/:id',
        component : GatewayDetailsComponent
    }
  ]

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class GatewaysRoutingModule {}
