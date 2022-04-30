import { Component,ViewChild,OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { NavController,AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import * as $ from "jquery";
declare var google: any;
@Component({
  	selector: 'app-otheraccpetride',
  	templateUrl: './otheraccpetride.page.html',
  	styleUrls: ['./otheraccpetride.page.scss'],
})
export class OtheraccpetridePage implements OnInit {

	data:any='';
	userdata = {
            "id":""
      };
      
      trip_status:any=1;
      driverdata:any='';
	servicedata: any;
      RideList:any=[];
	firtscall:any=0;
	ride_id:any='';
  	
      constructor(public route: Router,private geolocation: Geolocation,public alertController: AlertController,public navCtrl: NavController, public rest: RestService) 
      {

            if(this.firtscall==0)
            {
			this.firtscall=1;
                  this.Loaddatafun();
            }
	}

  	ngOnInit() {
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
            this.userdata = JSON.parse(localStorage.getItem('userdata'));

            console.log(this.userdata)
            this.rest.loadingPresent();
             this.rest.serverdataget("get_all_other_trips?user_id="+this.userdata.id).subscribe( res => {

			this.rest.loadingDismiss();
			let data:any=res;
			 console.log(data);
			if(data.status==true)
			{     
                        console.log(data)
				this.RideList=data.data;
                        
			}
                        
            },error => {
			this.rest.loadingDismiss();
            });
	}

	Cancelapifun(trip,st)
	{
            this.rest.loadingPresent();
            this.servicedata = [];
            // this.servicedata.push({"driver_id": dis});
            this.servicedata.push({"trip_id": trip});
            this.servicedata.push({"user_id": this.userdata.id});
            this.servicedata.push({"status":  st});
            this.rest.serverdataposttwo("change-status-other-trip-request",this.servicedata).subscribe( res => {
                  this.rest.loadingDismiss();
                  let data:any=res;
                  console.log(data);
                  if(data.status==true)
                  {
                        this.Loaddatafun();
                        this.rest.presentToast(data.message);
                       
                 }
            },error => {
                  this.rest.loadingDismiss();
            });   
      }
      
      gotoaccpted(dis,trip,st)
      {
            this.rest.loadingPresent();
            this.servicedata = [];
            this.servicedata.push({"driver_id": dis});
            this.servicedata.push({"trip_id": trip});
            this.servicedata.push({"user_id": this.userdata.id});
            this.servicedata.push({"status":st});
            this.rest.serverdataposttwo("change-status-other-trip-request",this.servicedata).subscribe( res => {
                  this.rest.loadingDismiss();
                  let data:any=res;
                  console.log(data);
                  if(data.status==true)
                  {    
                        this.rest.presentToast(data.message);
                        this.Loaddatafun();
                  }
            },error => {
                  this.rest.loadingDismiss();
                  this.rest.presentToast("Something went wrong");
            });   
      }
      
      

}

