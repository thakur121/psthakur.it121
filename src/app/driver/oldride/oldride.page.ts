import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NavController,Platform } from '@ionic/angular';
import { LocationService } from "../../location.service";
import { Subscription } from 'rxjs';
import { RestService } from 'src/app/services/rest.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import * as $ from "jquery";

declare var google: any;

@Component({
  selector: 'app-oldride',
  templateUrl: './oldride.page.html',
  styleUrls: ['./oldride.page.scss'],
})
export class OldridePage implements OnInit {

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
	emargencypopup:any=0;

      RequestRide={
            "v_type":"",
            "user_id":"",
            "trip_id":"",
            "from_lat":"",
            "from_lng":"",
            "phone_number":"",
            "user_name":"",
            "to_lat":"",
            "to_lng":"",
            "payment_type_name":"",
            "ride_fare":"",
            "profile_image":"",
            "driver_user_name":"",
            "driver_phone_number":"",
            "vehicle_color":"",
            "vehicle_plate_number":"",
            "expected_distance":"",
            "status":"",
            "time":"",
            "otp":"",
            "driver_id":"",
            "stops":[],
            "to":"",
            "from":""
         }

         driverDate={
            "id":"",
            "profile_image":"",
            "is_busy":"",
            "otp":"",
            "trip_id":""
      }
      stoplist:any=[];
      firstcall:any=0;
      servicedata: any;
      constructor(public navCtrl: NavController,private geolocation: Geolocation, public rest: RestService,public route: Router)
       {
            if(this.firstcall==0)
            {
               this.firstcall=1;
               this.loadfun();
               this.loadpagefun();
           } 
      }

      ngOnInit()
      {
            
         if(this.firstcall==0)
         {
             this.firstcall=1;
             this.loadfun(); 
             this.loadpagefun();   
         }
     }

     ionViewDidEnter()
    {
      if(this.firstcall==0)
      {
            this.firstcall=1; 
            this.loadfun(); 
            this.loadpagefun(); 
              
      }
     }

      loadfun()
      {
            this.driverDate = JSON.parse(localStorage.getItem('Driverdata'));
            // console.log(this.driverDate)
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
        this.map = new google.maps.Map(document.getElementById("driver_dtl"), mapOptions);
        var marker = new google.maps.Marker({
              position: latlng,
              map: this.map,
              draggable: true
        });
         this.directionsDisplay.setMap(this.map); 
        let geocoder = new google.maps.Geocoder;
        geocoder.geocode({'location': {'lat': this.latitude,'lng':this.longitude}}, (result, status) => {
                    this.currentposition=result[0].formatted_address;

        }) 
     }

      calculateAndDisplayRoute(plat: string,plng: string,dlat: string,dlng: string,stoplist: string | any[]) {
            console.log(plat+'  '+plng+'  '+dlat+'  '+dlng+'  '+stoplist)
            this.directionsService.route({
            origin: new google.maps.LatLng(plat,plng),
            destination: new google.maps.LatLng(dlat, dlng),
            waypoints: stoplist,
            travelMode: 'DRIVING'
            }, (response, status) => {
            if (status === 'OK') {
                  this.directionsDisplay.setDirections(response);
            
            } else {
                  console.log('Directions request failed due to '+ status);
            }
      });
      }


      loadpagefun()
      {
         this.rest.presentLoadingtime();
 
        this.rest.serverdataget("driver/trip_detail?user_id="+this.driverDate.id+"&trip_id="+localStorage.getItem('driver_book_id')).subscribe( res => {
        this.rest.loadingDismiss();
        this.firstcall=0;
        let data:any=res;
        console.log(this.data)
                  
        if(data.status==true)
          {
              this.RequestRide=data.data[0];
              this.stoplist=this.RequestRide.stops;
              let searray = this.RequestRide.stops;
              let onlyarray=[];
              for (var n = 0 ; n < searray.length ; n++) {
                 onlyarray.push(searray[n]);
                              
                 }
                   console.log(onlyarray);
                    var val = onlyarray;
                    var waypts = [];
                    $.each(val,function(field,value) 
                    {
                        waypts.push({
                          location: {lat: Number(value.stop_lat), lng: Number(value.stop_lng)},
                          stopover: true});           
                        });
                        this.calculateAndDisplayRoute(this.latitude,this.longitude,this.RequestRide.to_lat,this.RequestRide.to_lng,waypts)
                  }
          },error => {
                this.rest.loadingDismiss();
            });
      }


      gotodriverdtl()
 	{
  	  this.route.navigate(["/driver-home"]);
 	}

      gotostartride()
      {     
	   this.rest.presentLoadingtime();
	   this.servicedata = [];
	   this.servicedata.push({"user_id": this.RequestRide.user_id});
	   this.servicedata.push({"driver_id":this.driverDate.id});
	   this.servicedata.push({"trip_id":this.RequestRide.trip_id});
	   this.servicedata.push({"status":'7'});
	   this.servicedata.push({"address": this.currentposition});
	   this.servicedata.push({"role": '2'});
	   this.servicedata.push({"lat":this.latitude});
	   this.servicedata.push({"lng": this.longitude});
	   this.rest.serverdataposttwo("driver/trip_status_change",this.servicedata).subscribe( res => {
		   let data:any=res;
		   console.log(data);
		   this.rest.loadingDismiss();
		   if(data.status==true)
		   {
			   this.rest.presentToast(data.message);  
			   if(data.status==true)
			   {
				   this.navCtrl.navigateRoot("/driver-home");
			   }
			   else
			   {
				   this.loadpagefun();   
			   }
		   }
	   },error => {
		   this.rest.presentToast("Something went wrong");
	 });
      }

      gotoopencall(ty)
  	{
  		this.emargencypopup=ty;
  	}

}
