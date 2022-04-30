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
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


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
  	stoplist:any=[];
  	subscription: Subscription;


	cashpopup:any='2';
	setupin:any='1';
	changefarest='1';
	RequestRide={
		"v_type":"",
		"pickup_lo":"",
		"pickup_lat":"",
		"pickup_lng":"",
		"drop_lo":"",
		"drop_lat":"",
		"drop_lng":"",
		"payment_type":"",
		"payment_type_name":"",
		"price":"",
		"comment":""
	}
	userdata = {
      	"id": ""
  	};
	distance:any=0;
  	duration:any=0;
  	firstcall:any=0;
  	checkprice:any=0;
  	currentprice:any=0;
  	servicedata:any = [];

	constructor(public navCtrl: NavController, public rest: RestService,private geolocation: Geolocation,public route: Router,private locationService: LocationService) 
  	{
  		
  		this.loadfun();
  		this.RequestRide.pickup_lat=localStorage.getItem("pickup_lat");
		this.RequestRide.pickup_lng=localStorage.getItem("pickup_lng");
		this.RequestRide.pickup_lo=localStorage.getItem("pickup_add");
		this.RequestRide.drop_lat=localStorage.getItem("drop_lat");
		this.RequestRide.drop_lng=localStorage.getItem("drop_lng");
		this.RequestRide.drop_lo=localStorage.getItem("drop_add");
		if(Number(this.RequestRide.pickup_lat) > 1)
		{
			if(Number(this.RequestRide.pickup_lat) > 1)
			{
				var waypts = [];
				this.calculateAndDisplayRoute(Number(this.RequestRide.pickup_lat),Number(this.RequestRide.pickup_lng),Number(this.RequestRide.drop_lat),Number(this.RequestRide.drop_lng),waypts,'1');
			}
		}
  	}

  	ionViewDidEnter()
	{
		this.loadfun();
		this.RequestRide.pickup_lat=localStorage.getItem("pickup_lat");
		this.RequestRide.pickup_lng=localStorage.getItem("pickup_lng");
		this.RequestRide.pickup_lo=localStorage.getItem("pickup_add");	
		this.RequestRide.drop_lat=localStorage.getItem("drop_lat");
		this.RequestRide.drop_lng=localStorage.getItem("drop_lng");
		this.RequestRide.drop_lo=localStorage.getItem("drop_add");
		if(Number(this.RequestRide.pickup_lat) > 1)
		{
			if(Number(this.RequestRide.pickup_lat) > 1)
			{
				this.getcallroute('1');
			}
		}
	}
	getcallroute(ty){
		var val = JSON.parse(localStorage.getItem("stoplist"));
		this.stoplist = val;
    	if(val)
    	{
    		var waypts = [];
        	$.each(val,function(field,value) 
			{
	           	waypts.push({
	              	location: {lat: Number(value.lat), lng: Number(value.lng)},
	              	stopover: true}); 	    
      		});
	      	
	      	this.calculateAndDisplayRoute(Number(this.RequestRide.pickup_lat),Number(this.RequestRide.pickup_lng),Number(this.RequestRide.drop_lat),Number(this.RequestRide.drop_lng),waypts,ty);
    	}
    	else
    	{
    		var waypts = [];
    		waypts.push({
	              	location: {lat: Number(this.RequestRide.drop_lat), lng: Number(this.RequestRide.drop_lng)},
	              	stopover: true}); 
    		this.calculateAndDisplayRoute(Number(this.RequestRide.pickup_lat),Number(this.RequestRide.pickup_lng),Number(this.RequestRide.drop_lat),Number(this.RequestRide.drop_lng),waypts,ty);
    	}
	}
  	gotoenterlocationfun()
  	{
  		localStorage.removeItem('choose_add_ty');
        this.route.navigate(["/enterlocation"]);
  	}
  	gotopichuploaca(ty)
  	{
		localStorage.setItem('choose_add_ty',ty);
  		this.route.navigate(["/autoadd"]);
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
		this.map = new google.maps.Map(document.getElementById("home_c"), mapOptions);
		/*var marker = new google.maps.Marker({
			position: latlng,
			map: this.map,
			draggable: true
		});*/
		this.directionsDisplay.setMap(this.map);
	}
	addpaymentfun(ty)
	{
		this.cashpopup=ty;
	}
	gotochangefare(ty)
	{
		console.log(ty);
		this.changefarest=ty;
	}
	gotodriverlist()
	{
		this.route.navigate(["/selectdriver"]);
	}
	
	servicetypefun(ty:any)
	{
		this.RequestRide.v_type=ty;
	}
	gotopaymentfun(ty:any,name:any)
	{
		this.RequestRide.payment_type=ty;
		this.RequestRide.payment_type_name=name;	
	}
		
	addrequestform(){
		if (this.RequestRide.v_type =='') 
        {
          	this.rest.presentToast("Please choose service type");
        }
        else if (this.RequestRide.pickup_lo =='') 
        {
          	this.rest.presentToast("Please enter pickup location");
        }
        else if (this.RequestRide.drop_lo =='') 
        {
          	this.rest.presentToast("Please enter drop location");
        }
        else if (this.RequestRide.payment_type =='') 
        {
          	this.rest.presentToast("Please choose payment type");
        }
        else if (this.RequestRide.price =='') 
        {
          	this.rest.presentToast("Please enter price");
        }
        else 
        {
        	this.getcallroute('2');
        }

	}
	calculateAndDisplayRoute(plat,plng,dlat,dlng,stoplist,ty) {
 		
	    this.directionsService.route({
	      	origin: new google.maps.LatLng(plat,plng),
	      	destination: new google.maps.LatLng(dlat, dlng),
	      	waypoints: stoplist,
	      	travelMode: 'DRIVING'
	    }, (response, status) => {
	      	if (status === 'OK') {
	        	this.directionsDisplay.setDirections(response);
	        	var val = response.routes[0].legs;
              	var distance = 0;
              	var duration =0 ;
              	$.each(val,function(field,value) 
              	{
                  	distance += Number(value.distance.value); 
                  	duration += Number(value.duration.value); 
              	});
                this.distance=this.getMiles(distance);
              	this.duration=duration;
              	if(ty=='2')
              	{
              		if(this.firstcall==0)
	              	{
	                    this.firstcall=1;
	                    this.callgetprice(this.distance);
	          		}
              	}
              	
	      	} 
	    });
  	}
  	getMiles(i) 
  	{
	    return i*0.000621371192;
	}
	callgetprice(dis)
	{
		let url = "get_price?type="+this.RequestRide.v_type+"&distance="+dis
		this.rest.serverdataget(url).subscribe( res => {
			this.rest.loadingDismiss();
			let data:any=res;
			console.log(data);
			if(data.status==true)
			{
				this.checkprice=data.data;
				this.RequestRidefun();
			}
				
    	},error => {
           	this.rest.loadingDismiss();
    	});
	}
	RequestRidefun()
	{
		this.currentprice=this.RequestRide.price;
		if(Number(this.checkprice) > Number(this.RequestRide.price))
		{
			this.gotochangefare('2');
		}
		else
		{
			this.gotochangefare('1');
			this.addreuestridefun();
		}
	}
	gotoincressdecress(ty)
	{
		console.log(ty);
		if(ty=='1')
		{
			if(Number(this.currentprice) > 2)
			{
				this.currentprice = Number(this.currentprice) - 0.5;
				this.RequestRide.price=this.currentprice ;
			}
		}
		else
		{
			this.currentprice = Number(this.currentprice) + 0.5 ;
			this.RequestRide.price=this.currentprice ;
		}
	}
	addreuestridefun()
	{
		this.rest.loadingPresent();
		this.servicedata = [];
		this.servicedata.push({"user_id": this.userdata.id});
		this.servicedata.push({"from": this.RequestRide.pickup_lo});
		this.servicedata.push({"from_lat": this.RequestRide.pickup_lat});
		this.servicedata.push({"from_lng":  this.RequestRide.pickup_lng});
		this.servicedata.push({"stop_list": localStorage.getItem("stoplist")});
		this.servicedata.push({"vehicle_type":  this.RequestRide.v_type});
		this.servicedata.push({"charge":  this.RequestRide.price});
		this.servicedata.push({"to": this.RequestRide.drop_lo});
		this.servicedata.push({"to_lat": this.RequestRide.drop_lat});
		this.servicedata.push({"to_lng":  this.RequestRide.drop_lng});
      	this.servicedata.push({"expected_distance":  this.distance});
      	this.rest.serverdataposttwo("user/post_trip",this.servicedata).subscribe( res => {
      		this.rest.loadingDismiss();
          	let data:any=res;
      		console.log(data);
        	if(data.status==true)
        	{
        		
        	    this.rest.presentToast(data.message);
                localStorage.setItem("book_id",''+data.data.trip_id);
                localStorage.removeItem("pickup_lat");
				localStorage.removeItem("pickup_lng");
				localStorage.removeItem("pickup_add");
				localStorage.removeItem("drop_lat");
				localStorage.removeItem("drop_lng");
				localStorage.removeItem("drop_add");
				localStorage.removeItem("stoplist")
				this.changefarest='1';
                this.route.navigate(["/selectdriver"]);
        	}
        	else
        	{
              	this.rest.presentToast(data.message);
        	}
      	},error => {
            this.rest.loadingDismiss();
            this.rest.presentToast("Something went wrong");
        });
  	}
	

}
