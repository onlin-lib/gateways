import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { XhrService } from 'src/app/core/services/xhr/xhr.service';

@Component({
  selector: 'app-gateway-details',
  templateUrl: './gateway-details.component.html',
  styleUrls: ['./gateway-details.component.scss']
})
export class GatewayDetailsComponent implements OnInit {
  rows = [];
  columns = [
    {
      display : true,
      sortable : false,
      type : 'text',
      name: 'ID',
      prop : 'uid',
      size : '100px'
    },
    {
      display : true,
      sortable : false,
      type : 'text',
      name: 'Vendor',
      prop : 'vendor',
      size : '100px'
    },
    {
      display : true,
      sortable : false,
      type : 'text',
      name: 'Date',
      prop : 'date',
      size : '150px'
    },
    {
      display : true,
      sortable : false,
      type : 'status',
      name: 'Status',
      prop : 'status',
      size : '100px'
    }
  ];
  responsiveColumns =  [
    {
      display : true,
      sortable : false,
      type : 'text',
      name: 'ID',
      prop : 'uid',
      size : '100px'
    },
    {
      display : true,
      sortable : false,
      type : 'text',
      name: 'Vendor',
      prop : 'vendor',
      size : '100px'
    },
    {
      display : true,
      sortable : false,
      type : 'text',
      name: 'Date',
      prop : 'date',
      size : '150px'
    },
    {
      display : true,
      sortable : false,
      type : 'status',
      name: 'Status',
      prop : 'status',
      size : '100px'
    }
  ];
  gatewaySerial: any;
  getwayDetails: any;
  constructor(private xhrService : XhrService , private router : Router, private route : ActivatedRoute ) { 
    this.gatewaySerial = this.route.snapshot.params.id;
  }

  ngOnInit(): void {
    this.getGatewaysDetails(this.gatewaySerial);
    this.getGateWayDevices();
  }

  performAction(action : any){
    if(action.type === 'add'){

    }else if(action.type === 'view'){
      // this.router.navigate([`gateways/details/${action.row.serialNumber}`])
    }
  }

  getGatewaysDetails(serial : any){
    this.xhrService.getGatewayDetails(serial).subscribe((res : any) => {
      console.log(res);
      this.getwayDetails = res;
    })
  }

  getGateWayDevices(){
    this.xhrService.getDevicesForGateway(this.gatewaySerial).subscribe((res:any)=> {
      this.rows = res;
    })
  }

  navigateBack(){
    this.router.navigate(['gateways'])
  }
}
