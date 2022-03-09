import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { XhrService } from 'src/app/core/services/xhr/xhr.service';

@Component({
  selector: 'app-device-form',
  templateUrl: './device-form.component.html',
  styleUrls: ['./device-form.component.scss']
})
export class DeviceFormComponent implements OnInit {
  deviceForm : any;
  constructor(private formBuilder : FormBuilder ,
    @Inject(MAT_DIALOG_DATA) public data :any,
    private dialogRef: MatDialogRef<DeviceFormComponent>,

    private xhrService : XhrService) { }
  ngOnInit(): void {
    this.deviceForm = this.formBuilder.group({
      uid : ['' , [Validators.required]],
      vendor: ['' , [Validators.required]],
      status: ['' , [Validators.required ]],
    })
  }

  createDevice(){
    console.log(this.deviceForm.value)
    this.xhrService.addNewDevice({
      "uid": this.deviceForm.value.uid,
      "vendor": this.deviceForm.value.vendor,
      "status": this.deviceForm.value.status ? 'Online' : 'Offline',
      "date": new Date(),
      "relatedGatway": this.data.gatway.serialNumber
    });
    this.data.gatway.devices += 1
    this.dialogRef.close(true);
  }

  cancel(){
    this.dialogRef.close(false);
  }
}
