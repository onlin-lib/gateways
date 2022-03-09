import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators'
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class XhrService {
  devices : any;
  gateWays : any;
  constructor(private http : HttpClient) { }

  getGateways(){
    // call api to get data
    if(this.gateWays){
      return of(this.gateWays)
    }else{
      return  this.http.get('assets/data/data.json').pipe(map((res : any) => {
        this.gateWays = res;
        return res;
      }))
    }
  }

  getGatewayDetails(serial : any){
    let singleGatway : any;
    if(this.gateWays){
      this.gateWays.map((item : any) => {
        if(item.serialNumber === serial){
          singleGatway = item;
        }
      })
      return of(singleGatway)
    }else{
      return  this.http.get('assets/data/data.json').pipe(map((res : any) => {
         res.map((item : any) => {
          if(item.serialNumber === serial){
            singleGatway = item;
          }
        })
        return singleGatway
      }));
    }
  }

  getDevicesForGateway(serial:any){
    let certainDevices = [];
    if(this.devices){
      certainDevices = this.devices.filter((device : any) => {
        return device.relatedGatway === serial;
       })
       return of(certainDevices)
    }else{
      return this.http.get('assets/data/devices.json').pipe(map((res : any) => {
        this.devices = res;
        certainDevices = this.devices.filter((device : any) => {
         return device.relatedGatway === serial;
        })
        return certainDevices
      }));
    }
  }

  getAllDevices(){
    if(this.devices){
      return of(this.devices)
    }else{
      return this.http.get('assets/data/devices.json').pipe(map((res : any) => {
        this.devices = res;
      }));
    }
    
  }

  addNewGateway(gatway : any){
    this.gateWays.push(gatway)
  }

  addNewDevice(device : any){
    this.getAllDevices().subscribe(res => {
      this.devices.push(device)
    })
  }

}
