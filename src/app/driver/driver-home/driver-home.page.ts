import { Component,ViewChild,OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NavController,AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NotificationService } from "../../notification.service";
import * as $ from "jquery";
import { Subscription } from 'rxjs';
declare var google: any;

@Component({
      selector: 'app-driver-home',
      templateUrl: './driver-home.page.html',
      styleUrls: ['./driver-home.page.scss'],
})
export class DriverHomePage implements OnInit {

      @ViewChild('map',{static: false}) mapElement: ElementRef;
      directionsService = new google.maps.DirectionsService;
      directionsDisplay = new google.maps.DirectionsRenderer;
      data:any='';
      map: any;
      latlng :any;
      latitude:any;
      longitude:any;
      geocoder:any;
      currentposition:any;
      subscription: Subscription;
	Onstatus:any=true;
	Onstatusval:any='Online';
      openpopup:any=0;
      popuptype:any=0;

      driverDate={
            "id":"",
            "profile_image":"",
            "is_busy":"",
      
      }
  	servicedata: any;
      RideList:any=[];
      firtscall:any=0;
      reportpoup:any=0;

      resion:any='';
      resion_id:any='';

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
            "expected_distance":"",
            "user_price": ""
      }
      CF_price:any;
      CS_price:any;
      CT_price:any;
      Driver_price:any;
      Driver_time:any;
      Driver_distance:any;

      status:any=0;
     
      constructor(private notiser:NotificationService,public route: Router,private geolocation: Geolocation,public alertController: AlertController,public navCtrl: NavController, public rest: RestService) 
      { 
            this.subscription = this.notiser.getloc().subscribe(product => {
                  this.Loaddatafun();
      	})

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
            this.subscription = this.notiser.getloc().subscribe(product => {
                  this.Loaddatafun();
      	})
  	}
        
      ionViewDidEnter()
      {
            if(this.firtscall==0)
            {
                  this.firtscall=1;
                  this.Loaddatafun();   
            }
            this.subscription = this.notiser.getloc().subscribe(product => {
                  this.NotiLoaddatafun();
      	})
      }
  	OnstatusChanged($event:any)
  	{
  		this.Onstatus=$event;
  		if(this.Onstatus==true)
  		{
  			this.Onstatusval=='Online';
  		}else{
  			this.Onstatusval=='Offline';
  		}

  		console.log($event);
  	}
      openpopupfun(ty:any,wty:any)
      {
            this.openpopup=ty;
            this.popuptype=wty;
      }
      loadfun()
      {
            this.geolocation.getCurrentPosition({ maximumAge: 3000, timeout: 50000, enableHighAccuracy: true }).then((resp) => {
                  this.loadmap(resp.coords.latitude,resp.coords.longitude);
            }).catch((error) => {
                  console.log(error);
                  this.loadfun();
            });
      }
      loadmap(lata,langa) 
      {
            this.latitude = Number(lata);
            this.longitude = Number(langa);
            var latlng = new google.maps.LatLng(Number(this.latitude),Number(this.longitude));        
            let mapOptions = {
                  center: latlng,
                  zoom: 16,
                  mapTypeId: google.maps.MapTypeId.ROADMAP,
                  disableDefaultUI: true,
            }
            this.map = new google.maps.Map(document.getElementById("map_home"), mapOptions);
            this.directionsDisplay.setMap(this.map);
            this.calculateAndDisplayRoute(this.Ridedata.from_lat,this.Ridedata.from_lng,this.Ridedata.to_lat,this.Ridedata.to_lng);
            this.dirverdistance(this.Ridedata.from_lat,this.Ridedata.from_lng,this.latitude,this.longitude);
      }
      Loaddatafun()
      {
           
            this.driverDate = JSON.parse(localStorage.getItem('Driverdata'));
           
            this.OnstatusChanged(this.driverDate.is_busy);
            // this.rest.loadingPresent();
            this.servicedata = [];
            this.servicedata.push({"driver_id":  this.driverDate.id});

            this.rest.serverdataposttwo("driver/get_requested_ride",this.servicedata).subscribe( res => {
                  //     
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
      NotiLoaddatafun()
      {
           
            this.driverDate = JSON.parse(localStorage.getItem('Driverdata'));
           
            this.OnstatusChanged(this.driverDate.is_busy);
          
            this.servicedata = [];
            this.servicedata.push({"driver_id":  this.driverDate.id});

            this.rest.serverdataposttwo("driver/get_requested_ride",this.servicedata).subscribe( res => {
                  
                  let data:any=res;
                  console.log(data);
                 
                  if(data.status==true)
                  {
                        this.RideList=data.data;
                        console.log(this.RideList)
                  }
                        
            },error => {
                  
            });
      }
      async gotocancel(data)
      {
            this.Ridedata=data;
            
            const alert = await this.alertController.create({
                  cssClass: 'my-custom-class',
                  header: 'Confirm Cancel Ride',
                  message: 'Are You Sure Cancel Ride this Ride?',
                  buttons: [
                        {
                              text: 'No',
                              role: 'cancel',
                              cssClass: 'secondary',
                              handler: (blah) => {
                                    console.log('Confirm Cancel: blah');
                              }
                              }, {
                              text: 'Yes',
                              handler: () => {
                                    this.Cancelapifun();
                              }
                        }
                  ]
            });
            await alert.present();
            
      }
      Cancelapifun()
      {
            this.rest.loadingPresent();
            this.servicedata = [];
            this.servicedata.push({"trip_id":  this.Ridedata.trip_id});
            this.servicedata.push({"driver_id":  this.driverDate.id});
            this.servicedata.push({"user_id": this.Ridedata.user_id});
            this.servicedata.push({"status":  '2'});
            this.rest.serverdataposttwo("driver/trip_status_change",this.servicedata).subscribe( res => {
                  this.rest.loadingDismiss();
                  let data:any=res;
                  console.log(data);
                  if(data.status==true)
                  {
                        this.Loaddatafun();
                        this.rest.presentToast(data.message);
                        this.openpopup=0;
                        this.popuptype=0;
                  }
                  else
                  {
                        this.rest.presentToast(data.message);
                  }
            },error => {
                  this.rest.loadingDismiss();
            });   
      }
      gotoaccpted(data)
      {
          
            this.Ridedata=data;
            this.openpopup='1';
            this.popuptype='1';
            this.CF_price=Number(this.Ridedata.user_price)+0.5;
            this.CS_price=Number(this.Ridedata.user_price)+1;
            this.CT_price=Number(this.Ridedata.user_price)+1.5;
            this.loadfun();
           
      }
      calculateAndDisplayRoute(plat,plng,dlat,dlng) {
            this.directionsService.route({
                  origin: new google.maps.LatLng(plat,plng),
                  destination: new google.maps.LatLng(dlat, dlng),
                  travelMode: 'DRIVING'
            }, (response, status) => {
                  if (status === 'OK') {
                        this.directionsDisplay.setDirections(response);
                        
                  } 
            });
      }

      dirverdistance(plat,plng,dlat,dlng) {
            this.directionsService.route({
                  origin: new google.maps.LatLng(plat,plng),
                  destination: new google.maps.LatLng(dlat, dlng),
                  travelMode: 'DRIVING'
            }, (response, status) => {
                  if (status === 'OK') {
                       
                        var val = response.routes[0].legs;
                        var distance = 0;
                        var duration =0 ;
                        $.each(val,function(field,value) 
                        {
                              distance += Number(value.distance.value); 
                              duration += Number(value.duration.value); 
                        });
                        this.Driver_distance=this.getMiles(distance);
                        console.log(this.Driver_distance);
                  } 
            });
      }
      getMiles(i) 
      {
          return i*0.000621371192;
      }
      gotoreport(data)
      {
            this.reportpoup='1';  
            this.Ridedata=data;
      }
      submitreportfun()
      {
            if(this.resion=="")
            {
                  this.rest.presentToast('Please add Resion,Why are report user');
            }
            else
            {     
                  this.rest.loadingPresent();
                  this.servicedata = [];
                  this.servicedata.push({"trip_id":  this.Ridedata.trip_id});
                  this.servicedata.push({"user_id":  this.Ridedata.user_id});
                  this.servicedata.push({"driver_price":  this.Driver_price});
                  this.servicedata.push({"driver_id":  this.driverDate.id});
                  this.servicedata.push({"driver_time":  this.Driver_time});
                  this.servicedata.push({"reason":  this.resion});
                  this.rest.serverdataposttwo("driver/trip_report",this.servicedata).subscribe( res => {
                        this.rest.loadingDismiss();
                        let data:any=res;
                        console.log(data);
                        if(data.status==true)
                        {
                              this.RideList=data.data;
                              this.openpopup=0;
                              this.popuptype=0;
                              this.rest.presentToast(data.message);
                        }
                        else
                        {
                              this.rest.presentToast(data.message);
                        }
                  },error => {
                        this.rest.loadingDismiss();
                  });

            } 
      }
      driverpriceacc(price)
      {
            this.Driver_price=price;
            this.openpopup=1;
            this.popuptype=2;
      }

      gotodriverdtl()
      {
         this.route.navigate(["/driver-home"]);
      }

      drivertimeacc(time)
      {
            this.Driver_time=time;
            this.rest.loadingPresent();
            this.servicedata = [];
            this.servicedata.push({"trip_id":  this.Ridedata.trip_id});
            this.servicedata.push({"driver_id":  this.driverDate.id});
            this.servicedata.push({"user_id":  this.Ridedata.user_id});
            this.servicedata.push({"status":  '1'});
            this.servicedata.push({"arrive_time":  this.Driver_time});
            this.servicedata.push({"price":  this.Driver_price});
            this.servicedata.push({"distance": this.Driver_distance});
            this.servicedata.push({"lat":  localStorage.getItem("current_lat")});
            this.servicedata.push({"lng":  localStorage.getItem("current_lng")});
            this.rest.serverdataposttwo("driver/offer_payment",this.servicedata).subscribe( res => {
                  this.rest.loadingDismiss();
                  let data:any=res;
                  this.Loaddatafun();
                  console.log(data);
                  if(data.status==true)
                  {
                        this.RideList=data.data;
                        this.openpopup=0;
                        this.popuptype=0;

                        this.navCtrl.navigateRoot("/driver-home");
                  }
                  else
                  {
                        this.rest.presentToast(data.message);
                  }
            },error => {
                  this.rest.loadingDismiss();
            });
      }

      gotostartridepage(rl:any){
            console.log(rl);  
            if(rl.status=='3')
            {
                 
                  localStorage.setItem('driver_book_id',rl.trip_id)
                  this.navCtrl.navigateRoot("/startride");
            }
            else if(rl.status=='6')
            {
                  localStorage.setItem('driver_book_id',rl.trip_id)
                  this.navCtrl.navigateRoot("/completeride");
            }
      }

}
