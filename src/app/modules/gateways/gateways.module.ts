import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GatewaysComponent } from './pages/gateways/gateways.component';
import { GatewaysRoutingModule } from './gateways-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { GatewayDetailsComponent } from './pages/gateway-details/gateway-details.component';
import { GatewaysFormComponent } from './components/gateways-form/gateways-form.component';
import { DeviceFormComponent } from './components/device-form/device-form.component';
import { MatDialogModule , MatDialogRef} from'@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';


@NgModule({
  declarations: [
    GatewaysComponent,
    GatewayDetailsComponent,
    GatewaysFormComponent,
    DeviceFormComponent
  ],
  imports: [
    CommonModule,
    GatewaysRoutingModule,
    SharedModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    },
  ]
})
export class GatewaysModule { }
