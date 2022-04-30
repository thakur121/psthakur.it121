import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { RestService } from 'src/app/services/rest.service';
import * as $ from "jquery";


@Component({
  selector: 'app-selectdriver',
  templateUrl: './selectdriver.page.html',
  styleUrls: ['./selectdriver.page.scss'],
})
export class SelectdriverPage implements OnInit {

  	RequestRide={
            "v_type":"",
            "pickup_lo":"",
            "pickup_lat":"",
            "pickup_lng":"",
            "drop_lo":"",
            "drop_lat":"",
            "drop_lng":"",
            "payment_type_name":"",
            "expected_distance":"",
            "ride_fare":"",
            "from":"",
            "to":""
      }
      userdata = {
          "id": ""
      };
      DriverList:any=[];
      firstcall:any=0;
      servicedata: any;
      driverstatus:any=1;
	constructor(public navCtrl: NavController, public rest: RestService,public route: Router) 
      { 
            if(this.firstcall==0)
            {
                  this.firstcall=1;
                  this.loadpagefun();
            }
	}

  	ngOnInit() 
      {
            if(this.firstcall==0)
            {
                  this.firstcall=1; 
                  this.loadpagefun();   
            }
  	}
      ionViewDidEnter()
      {
            if(this.firstcall==0)
            {
                  this.firstcall=1; 
                  this.loadpagefun();   
            }
      }
  	
      loadpagefun()
      {
            this.rest.presentLoadingtime();
            this.userdata = JSON.parse(localStorage.getItem('userdata'));
            console.log(this.userdata);
            this.rest.serverdataget("user/trip_detail?user_id="+this.userdata.id+"&trip_id="+localStorage.getItem('book_id')).subscribe( res => {
                  this.rest.loadingDismiss();
                  this.firstcall=0;
                  let data:any=res;
                  console.log(data);
                  this.driverlistfun();
                  if(data.status==true)
                  {
                     this.RequestRide=data.data[0];
                  }
            },error => {
                  this.rest.loadingDismiss();
            });
      }
     
      driverlistfun()
      {
            this.rest.presentLoadingtime();
            this.userdata = JSON.parse(localStorage.getItem('userdata'));
            this.rest.serverdataget("user/req_accepted_driver?user_id="+this.userdata.id+"&trip_id="+localStorage.getItem('book_id')).subscribe( res => {
                  this.rest.loadingDismiss();
                  let data:any=res;
                  console.log(data);
                  if(data.status==true)
                  {     
                        this.DriverList=data.data;
                        this.driverstatus=0;
                  }
                  else{
                        this.driverstatus=1;
                  }
            },error => {
                  this.rest.loadingDismiss();
            });
      }

      gotodriverdtl()
      {
          this.route.navigate(["/home"]);
      }
      gotoaccptedtrip(dis,st)
      {
            this.rest.presentLoadingtime();
            this.servicedata = [];
            this.servicedata.push({"user_id": this.userdata.id});
            this.servicedata.push({"driver_id": dis});
            this.servicedata.push({"trip_id": localStorage.getItem('book_id')});
            this.servicedata.push({"status": st});
            this.rest.serverdataposttwo("user/trip_status_change",this.servicedata).subscribe( res => {
                  let data:any=res;
                  console.log(data);
                  this.rest.loadingDismiss();
                  if(data.status==true)
                  {
                        this.rest.presentToast(data.message);  
                        this.navCtrl.navigateRoot("/home");
                        
                  }else{
                        this.rest.presentToast(data.message); 
                  }
            },error => {
                  
                  this.rest.presentToast("Something went wrong");
          });
      }

      doRefresh(event) {
            this.loadpagefun()
            setTimeout(() => {
                 console.log('Async operation has ended');
                 event.target.complete();
            }, 2000);
       }
}
