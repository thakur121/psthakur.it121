import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController,Platform } from '@ionic/angular';

import { RestService } from 'src/app/services/rest.service';


@Component({
  selector: 'app-ridehistory',
  templateUrl: './ridehistory.page.html',
  styleUrls: ['./ridehistory.page.scss'],
})
export class RidehistoryPage implements OnInit {


      driverDate = {
      	"id": ""
  	};
  	servicedata: any;
      RideList:any=[];
      firtscall:any=0;
      reportpoup:any=0;


      Ridedata={
            "user_id":"",
            "customer_name": "",
            "customer_profile_image": "",
            "distance": "",
            "from": "",
            "from_lat": "",
            "from_lng": "",
            "lat": "",
            "lng": "",
            "miles": "",
            "rating": "",
            "to": "",
            "to_lat": "",
            "to_lng": "",
            "trip_id": "",
            "user_price": ""
      }
       constructor(public navCtrl: NavController, public rest: RestService,public route: Router)
       {
            if(this.firtscall==0)
            {
                  this.firtscall=1;
                  this.Loaddatafun();
                  
            }
        }

      ngOnInit()
      {

            if(this.firtscall==0)
            {
                  this.firtscall=1;
                  this.Loaddatafun();
                  
            }
      }

      ionViewDidEnter()
      {
            if(this.firtscall==0)
            {
                  this.firtscall=1;
                  this.Loaddatafun();   
            }
            
      }

      Loaddatafun()
      {
           
            this.driverDate = JSON.parse(localStorage.getItem('Driverdata'));
            this.rest.loadingPresent();
            this.servicedata = [];
            this.servicedata.push({"driver_id":  this.driverDate.id});

            this.rest.serverdataposttwo("driver/get_requested_ride",this.servicedata).subscribe( res => {
                  this.rest.loadingDismiss();
                  let data:any=res;
                  console.log(data);
                 
                  if(data.status==true)
                  {
                        this.RideList=data.data;
                        console.log(this.RideList)
                        
                  }
                        
            },error => {
                  this.rest.loadingDismiss();
            });
      }

}
