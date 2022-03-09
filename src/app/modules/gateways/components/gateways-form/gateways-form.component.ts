import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { XhrService } from 'src/app/core/services/xhr/xhr.service';

@Component({
  selector: 'app-gateways-form',
  templateUrl: './gateways-form.component.html',
  styleUrls: ['./gateways-form.component.scss']
})
export class GatewaysFormComponent implements OnInit {
  gatewayForm : any;
  constructor(private formBuilder : FormBuilder ,
    private dialogRef: MatDialogRef<GatewaysFormComponent>,
    private xhrService : XhrService) { }
  ngOnInit(): void {
    this.gatewayForm = this.formBuilder.group({
      name : ['' , [Validators.required]],
      serial: ['' , [Validators.required]],
      ip: ['' , [Validators.required , this.customValidator() ]],
    })
  }

  customValidator() {
    return (control: AbstractControl) => {
      const regex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
  
      if (regex.test(control.value)) {
        return null;
      }
  
      return { ipError: true };
    };
  }

  createGateWay(){
    this.xhrService.addNewGateway({
      "serialNumber": this.gatewayForm.value.serial,
      "name": this.gatewayForm.value.name,
      "ipv4": this.gatewayForm.value.ip,
      "devices": 0
    })
    this.dialogRef.close(true);
  }

  cancel(){
    this.dialogRef.close(false);
  }
}
