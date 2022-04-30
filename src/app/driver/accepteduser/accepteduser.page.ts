import { Component, OnInit} from '@angular/core';
import { Location } from "@angular/common";
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { RestService } from 'src/app/services/rest.service';
import * as $ from "jquery";

@Component({
  selector: 'app-accepteduser',
  templateUrl: './accepteduser.page.html',
  styleUrls: ['./accepteduser.page.scss'],
})
export class AccepteduserPage implements OnInit {

	Driverdata = {
          "id":"",
     };

     UserList:any=[];
     DataDriver:any='';
     other_book_id:any='';
     firstcall:any=0;
     servicedata: any;
     driverstatus:any=1;
     constructor(public navCtrl: NavController,private location: Location, public rest: RestService,public route: Router) 
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
          this.Driverdata = JSON.parse(localStorage.getItem('Driverdata'));
          this.DataDriver =JSON.parse(localStorage.getItem('other_book_id'));
          console.log(this.DataDriver);
          this.rest.serverdataget("get-users-accepted-other-trips?trip_id="+this.DataDriver.id+"&trip_status="+this.DataDriver.trip_status).subscribe( res => {
               this.rest.loadingDismiss();
               this.firstcall=0;
               let data:any=res;
               console.log(data);
               if(data.status==true)
               {
                    this.UserList=data.data;
                    this.driverstatus=1;
               }
               else{
                    this.driverstatus=0;
               }
          },error => {
                    this.rest.loadingDismiss();
          });
     }
    
     gotodriverdtl()
     {
         this.route.navigate(["/home"]);
     }

     gotoaccptedtrip(u_id,trip,st)
     {
          this.rest.presentLoadingtime();
          this.servicedata = [];
          this.servicedata.push({"driver_id": this.Driverdata.id});
          this.servicedata.push({"user_id": u_id});
          this.servicedata.push({"trip_id":trip});
          this.servicedata.push({"status": st});
          this.rest.serverdataposttwo("change-status-other-trip-request-driver",this.servicedata).subscribe( res => {
               let data:any=res;
               console.log(data);
               this.rest.loadingDismiss();
               if(data.status==true)
               {
                    this.rest.presentToast(data.message); 
                    this.loadpagefun();  
               }
               else{
                    this.rest.presentToast(data.message); 
               }
          },error => {
               this.rest.presentToast("Something went wrong");
          });
     }

     completeride(st){
          this.rest.presentLoadingtime();
          this.servicedata = [];
          this.servicedata.push({"driver_id": this.Driverdata.id});
          this.servicedata.push({"trip_id":this.DataDriver.id});
          this.servicedata.push({"status": st});
          this.rest.serverdataposttwo("change-other-trip-status",this.servicedata).subscribe( res => {
               let data:any=res;
               console.log(data);
               this.rest.loadingDismiss();
               if(data.status==true)
               {
                    // this.location.back();
                    this.route.navigate(["/driver-home"]);
                    this.rest.presentToast(data.message);
               }
               else{
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
     gotoback()
     {
          this.location.back();
     }
}
