import { Component,ViewChild,OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NavController,AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import * as $ from "jquery";
declare var google: any;

@Component({
  selector: 'app-otheraccpet',
  templateUrl: './otheraccpet.page.html',
  styleUrls: ['./otheraccpet.page.scss'],
})
export class OtheraccpetPage implements OnInit {


      data:any='';
	Driverdata = {
            "id":"",
           
      };
      //driverdata:any='';
	servicedata: any;
      RideList:any=[];
	firtscall:any=0;
	ride_id:any='';
      status:any=1; 

    constructor(public route: Router,private geolocation: Geolocation,public alertController: AlertController,public navCtrl: NavController, public rest: RestService)
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
            this.Driverdata = JSON.parse(localStorage.getItem('Driverdata'));
            console.log(this.Driverdata)
            this.rest.loadingPresent();
            this.rest.serverdataget("get_other_trips_accept?driver_id="+this.Driverdata.id+"&trip_id="+localStorage.getItem('book_id')).subscribe( res => {
                  this.rest.loadingDismiss();
                  let data:any=res;
                  console.log(data);
                  if(data.status==true)
                  {     
                        this.RideList=data.data;
                  }
            },error => {
                  this.rest.loadingDismiss();
            });
      }

     

      Cancelapifun(u_id,trid,st)
	{

            this.rest.loadingPresent();
            this.servicedata = [];
            this.servicedata.push({"driver_id":  this.Driverdata.id});
            this.servicedata.push({"trip_id": trid});
            this.servicedata.push({"user_id": u_id});
            this.servicedata.push({"status":  st});
            this.rest.serverdataposttwo("status_request_book_other_trip",this.servicedata).subscribe( res => {
                  this.rest.loadingDismiss();
                  let data:any=res;
                  console.log(data);
                  if(data.status==true)
                  {
                        this.rest.presentToast(data.message);
                        if(st==2)
                        {
                            this.navCtrl.navigateRoot("/otheraccpet");
                        }
                        else
                        {
                            this.rest.presentToast(data.message);
                        }
                 }
            },error => {
                  this.rest.loadingDismiss();
            });   
      }


      gotoaccpted(u_id,trid,st)
      {
            this.rest.loadingPresent();
            this.servicedata = [];
            this.servicedata.push({"driver_id": this.Driverdata.id});
            this.servicedata.push({"trip_id": trid});
            this.servicedata.push({"user_id": u_id});
            this.servicedata.push({"status":st});
            this.rest.serverdataposttwo("status_request_book_other_trip",this.servicedata).subscribe( res => {
                  this.rest.loadingDismiss();
                  let data:any=res;
                  console.log(data);
                  if(data.status==true)
                  {    
                        this.rest.presentToast(data.message);
                        if(st==1)
                        {
                            this.navCtrl.navigateRoot("/driver-home");
                        }
                         else
                        {
                            this.Loaddatafun();
                        }
                  }
            },error => {
                  this.rest.loadingDismiss();
                  this.rest.presentToast("Something went wrong");
            });   
      }
      

}
