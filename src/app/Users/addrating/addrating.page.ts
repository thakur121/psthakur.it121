import { Component,ViewChild,OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NavController,Platform } from '@ionic/angular';
import { LocationService } from "../../location.service";
import { Subscription } from 'rxjs';
import { RestService } from 'src/app/services/rest.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import * as $ from "jquery";

declare var google: any;

@Component({
  selector: 'app-addrating',
  templateUrl: './addrating.page.html',
  styleUrls: ['./addrating.page.scss'],
})
export class AddratingPage implements OnInit {

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
            "driver_id":"",
            "rating":"",
            "review":"",
            "v_type":"",
            "from_lat":"",
            "from_lng":"",
            "to_lat":"",
            "to_lng":"",
            "payment_type_name":"",
            "expected_distance":"",
            "ride_fare":"",
            "driver_profile_image":"",
            "driver_user_name":"",
            "driver_phone_numbe":"",
            "vehicle_color":"",
            "status":"",
            "stops":[],
            "to":"",
            "from":""
      }
      userdata = {
          "id": "",
          "driver_id":"",
          "rating":"",
          "review":"",
      };
    stoplist:any=[];
   	firstcall:any=0;
	servicedata: any;
	ratingvalue:any=0;
	commentval:any=0;
	comment:any='';
	textcomment:any='';

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
        this.userdata = JSON.parse(localStorage.getItem('userdata'));
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
        this.map = new google.maps.Map(document.getElementById("rating_p"), mapOptions);
        var marker = new google.maps.Marker({
          	position: latlng,
          	map: this.map,
          	draggable: true
        });
     	    this.directionsDisplay.setMap(this.map);

           this.directionsDisplay.setMap(this.map);
           let geocoder = new google.maps.Geocoder;
           geocoder.geocode({'location': {'lat': this.latitude,'lng':this.longitude}}, (result, status) => {
                       this.currentposition=result[0].formatted_address;
           })
            
  	}
  	calculateAndDisplayRoute(plat,plng,dlat,dlng,stoplist) {
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
				console.log('Directions request failed due to ' + status);
			}
        });
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

     
  	gotoopencall(ty)
  	{
  		this.emargencypopup=ty;
  	}
	  
  	gotoaddrating(ty)
  	{
  		this.ratingvalue=ty;
  		$(".remove").removeClass("active");
  		if(ty=='1')
  		{
  			$("#star1").addClass("active");
  		}
  		else if(ty=='2')
  		{
  			$("#star1").addClass("active");
  			$("#star2").addClass("active");
  		}
  		else if(ty=='3')
  		{
  			$("#star1").addClass("active");
  			$("#star2").addClass("active");
  			$("#star3").addClass("active");
  		}
  		else if(ty=='4')
  		{
  			$("#star1").addClass("active");
  			$("#star2").addClass("active");
  			$("#star3").addClass("active");
  			$("#star4").addClass("active");
  		}
  		else if(ty=='5')
  		{
  			$("#star1").addClass("active");
  			$("#star2").addClass("active");
  			$("#star3").addClass("active");
  			$("#star4").addClass("active");
  			$("#star5").addClass("active");
  		}
  	}
  	gotocomment(ty:any,ct:any)
  	{
  		console.log(ty);
  		this.commentval=ty;
  		this.comment=ct;
		
  		$(".sec").removeClass("active");
  		if(ty=='1')
  		{
  			$("#comm1").addClass("active");
  		}
  		else if(ty=='2')
  		{
  			$("#comm2").addClass("active");
  		}
  		else if(ty=='3')
  		{
  			$("#comm3").addClass("active");
  		}
  		else if(ty=='4')
  		{
  			$("#comm4").addClass("active");
  		}
  		else if(ty=='5')
  		{
  			$("#comm5").addClass("active");
  		}
  		else if(ty=='6')
  		{
  			$("#comm6").addClass("active");
  		}
  		else if(ty=='7')
  		{
  			$("#comm7").addClass("active");
  		}
     }

    gotodriverdtl()
    {
      this.route.navigate(["/home"]);
    }


  	gotoaddcommernt()
  	{
  		if(this.ratingvalue==0)
  		{
  			this.rest.presentToast('Please add rating'); 
  		}
  		else if(this.textcomment=='' || this.comment =='')
  		{
  			this.rest.presentToast('Please add your comment'); 
  		}
  		else 
  		{
		      this.rest.presentLoadingtime();
			this.servicedata = [];
		      this.servicedata.push({"rating_from": this.userdata.id});
                  this.servicedata.push({"rating_to":this.RequestRide.driver_id});
                  this.servicedata.push({"rating":this.ratingvalue});
                  this.servicedata.push({"review":this.textcomment});
                  this.servicedata.push({"trip_id": localStorage.getItem('book_id')});
		
			this.rest.serverdataposttwo("user/rating",this.servicedata).subscribe( res => {
				let data:any=res;
				console.log(data);
				this.rest.loadingDismiss();
				if(data.status==true)
				{
				      this.rest.presentToast(data.message);  
					if(data.status==true)
					{
						this.navCtrl.navigateRoot("/home");
				      }
					else
					{
					    this.loadpagefun();   
					}
				}
		      }, error => {
					this.rest.presentToast("Something went wrong");
			});
			
	  
  		}
  	}

}

