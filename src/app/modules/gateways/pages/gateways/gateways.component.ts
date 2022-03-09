import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { XhrService } from 'src/app/core/services/xhr/xhr.service';
import { MatDialog } from '@angular/material/dialog';
import { GatewaysFormComponent } from '../../components/gateways-form/gateways-form.component';
import { DeviceFormComponent } from '../../components/device-form/device-form.component';

@Component({
  selector: 'app-gateways',
  templateUrl: './gateways.component.html',
  styleUrls: ['./gateways.component.scss']
})
export class GatewaysComponent implements OnInit {
  rows = [];
  columns = [
    {
      display : true,
      sortable : false,
      type : 'text',
      name: 'Serial Number',
      prop : 'serialNumber',
      size : '200px'
    },
    {
      display : true,
      sortable : false,
      type : 'text',
      name: 'Gate Name',
      prop : 'name',
      size : '200px'
    },
    {
      display : true,
      sortable : false,
      type : 'text',
      name: 'IPV4',
      prop : 'ipv4',
      size : '150px'
    },
    {
      display : true,
      sortable : false,
      type : 'text',
      name: 'Devices',
      prop : 'devices',
      size : '50px'
    },
    {
      display : true,
      sortable : false,
      type : 'actions',
      name: 'Actions',
      prop : '',
      size : '100px'
    }
  ];
  responsiveColumns =  [
    {
      display : true,
      sortable : false,
      type : 'text',
      name: 'Serial Number',
      prop : 'serialNumber',
      size : '150px'
    },
    {
      display : true,
      sortable : false,
      type : 'text',
      name: 'Gate Name',
      prop : 'name',
      size : '150px'
    },
    {
      display : true,
      sortable : false,
      type : 'text',
      name: 'IPV4',
      prop : 'ipv4',
      size : '150px'
    },
    {
      display : true,
      sortable : false,
      type : 'text',
      name: 'Devices',
      prop : 'devices',
      size : '150px'
    }
  ];
  constructor(private xhrService : XhrService , private router : Router , private dialog : MatDialog) { }

  ngOnInit(): void {
    this.getGateways();
  }

  performAction(action : any){
    if(action.type === 'add'){
      this.openAddingDevice(action.row);
    }else if(action.type === 'view'){
      this.router.navigate([`gateways/details/${action.row.serialNumber}`])
    }
  }

  getGateways(){
    this.xhrService.getGateways().subscribe((res : any) => {
      this.rows = res;
    })
  }

  openAddingGatewayForm(){
  let dialofRef =  this.dialog.open(GatewaysFormComponent , {
      width: '500px',
      height: '550px',
      data: {},
      disableClose: true,
    })
  
    dialofRef.afterClosed().subscribe(res => {
      if(res){
        this.getGateways();
      }
    })
  }

  openAddingDevice(gatway : any){
    let dialofRef =  this.dialog.open(DeviceFormComponent , {
      width: '500px',
      height: '550px',
      data: {gatway : gatway},
      disableClose: true,
    })
  
    dialofRef.afterClosed().subscribe(res => {
      if(res){
        this.getGateways();
      }
    })
  
  }
}
