import { Component,ViewChild,OnInit, ElementRef} from '@angular/core';
import { NavController,Platform } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

import { Geolocation } from '@ionic-native/geolocation/ngx';

import * as $ from "jquery";



import { Location } from "@angular/common";

import {  LocationService } from "../../location.service";


declare var google: any;

@Component({
	selector: 'app-autoadd',
	templateUrl: './autoadd.page.html',
	styleUrls: ['./autoadd.page.scss'],
})
export class AutoaddPage implements OnInit {

  	@ViewChild('map',{static: false}) mapElement: ElementRef;
	data:any='';
	map: any;
	latlng :any;
	latitude:any;
	longitude:any;
 

	geocoder:any
	geoLatitude: number;
	geoLongitude: number;
	geoAccuracy:number;
	geoAddress: string;

	watchLocationUpdates:any; 
	loading:any;
	isWatching:boolean;

	currentposition:any='';
	crimetype:any='';
	country_code:any='';
	callfirst:any=0;

	searchText:string;

	constructor(public navCtrl: NavController,private location: Location,
			private geolocation: Geolocation,public rest: RestService,private locationService: LocationService) 
	{ 
		this.loadfun();
	}

	ionViewDidEnter()
	{
		this.loadfun();
	}
	loadfun()
	{
		this.geolocation.getCurrentPosition({ maximumAge: 3000, timeout: 50000, enableHighAccuracy: true }).then((resp) => {
      		if(localStorage.getItem('choose_add_ty')=='1')
      		{
      			localStorage.setItem("pickup_lat",''+resp.coords.latitude);
				localStorage.setItem("pickup_lng",''+resp.coords.longitude);
      		}
      		else if(localStorage.getItem('choose_add_ty')=='2')
      		{
      			localStorage.setItem("drop_lat",''+resp.coords.latitude);
				localStorage.setItem("drop_lng",''+resp.coords.longitude);
      		}
      		else if(localStorage.getItem('choose_add_ty')=='3')
      		{
      			localStorage.setItem("choose_lat",''+resp.coords.latitude);
				localStorage.setItem("choose_lng",''+resp.coords.longitude);
      		}
      		else if(localStorage.getItem('choose_add_ty')=='4')
      		{
      			localStorage.setItem("city_pick_lat",''+resp.coords.latitude);
				localStorage.setItem("city_pick_lng",''+resp.coords.longitude);
      			localStorage.setItem("city_pickup_add",''+this.currentposition);
      		}
      		else if(localStorage.getItem('choose_add_ty')=='5')
      		{
      			localStorage.setItem("city_drop_lat",''+resp.coords.latitude);
				localStorage.setItem("city_drop_lng",''+resp.coords.longitude);
				localStorage.setItem("city_drop_add",''+this.currentposition);
      		}
      		this.loadmap(resp.coords.latitude,resp.coords.longitude);
		}).catch((error) => {
      		this.loadfun();
      		this.loadmap('24.774265', '46.738586');
	 	});
	}
	ngOnInit()
	{
		this.loadfun();
	}
			
	loadmap(lata,langa) 
	{
		
		this.latitude = Number(lata);
		this.longitude = Number(langa);
		
		var myStyles =[
		    {
		        featureType: "poi",
		        elementType: "labels",
		        stylers: [
		              { visibility: "off" }
		        ]
		    }
		];
		
		var latlng = new google.maps.LatLng(Number(this.latitude),Number(this.longitude));        
		let mapOptions = {
			center: latlng,
			zoom: 16,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			disableDefaultUI: true,
			
			styles: myStyles 
		}
		this.map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
		var marker = new google.maps.Marker({
			position: latlng,
			map: this.map,
			draggable: true
		});
					 
		let geocoder = new google.maps.Geocoder;
		geocoder.geocode({'location': {'lat': this.latitude,'lng':this.longitude}}, (result, status) => {
				this.currentposition=result[0].formatted_address;

				console.log(result);
				this.latitude = this.latitude;
				$("#clocation").val(this.currentposition);
				this.longitude = this.longitude;
				if(localStorage.getItem('choose_add_ty')=='1')
      			{
      				localStorage.setItem("pickup_lat",''+this.latitude);
					localStorage.setItem("pickup_lng",''+this.longitude);
					localStorage.setItem("pickup_add",''+this.currentposition);
      			}
      			else if(localStorage.getItem('choose_add_ty')=='2')
	      		{
	      			localStorage.setItem("drop_lat",''+this.latitude);
					localStorage.setItem("drop_lng",''+this.longitude);
					localStorage.setItem("drop_add",''+this.currentposition);
	      		}
	      		else if(localStorage.getItem('choose_add_ty')=='3')
      			{
      				localStorage.setItem("choose_lat",''+this.latitude);
					localStorage.setItem("choose_lng",''+this.longitude);
					localStorage.setItem("choose_add",''+this.currentposition);
      			}
      			else if(localStorage.getItem('choose_add_ty')=='4')
	      		{
	      			localStorage.setItem("city_pick_lat",''+this.latitude);
					localStorage.setItem("city_pick_lng",''+this.longitude);
	      			localStorage.setItem("city_pickup_add",''+this.currentposition);
	      		}
	      		else if(localStorage.getItem('choose_add_ty')=='5')
	      		{
	      			localStorage.setItem("city_drop_lat",''+this.latitude);
					localStorage.setItem("city_drop_lng",''+this.longitude);
					localStorage.setItem("city_drop_add",''+this.currentposition);
	      		}
		 })  
						
		let autocomplete = new google.maps.places.Autocomplete(document.getElementById("clocation"), mapOptions);
		google.maps.event.addListener(autocomplete, 'place_changed', () => {
			let place = autocomplete.getPlace();
			console.log(place);
			this.currentposition=place.formatted_address;
			$("#clocation").val(this.currentposition);
			this.latitude = place.geometry.location.lat();
			this.longitude = place.geometry.location.lng();
			if(localStorage.getItem('choose_add_ty')=='1')
  			{
  				localStorage.setItem("pickup_lat",''+this.latitude);
				localStorage.setItem("pickup_lng",''+this.longitude);
				localStorage.setItem("pickup_add",''+this.currentposition);
  			}
  			else if(localStorage.getItem('choose_add_ty')=='2')
      		{
      			localStorage.setItem("drop_lat",''+this.latitude);
				localStorage.setItem("drop_lng",''+this.longitude);
				localStorage.setItem("drop_add",''+this.currentposition);
      		}
      		else if(localStorage.getItem('choose_add_ty')=='3')
  			{
  				localStorage.setItem("choose_lat",''+this.latitude);
				localStorage.setItem("choose_lng",''+this.longitude);
				localStorage.setItem("choose_add",''+this.currentposition);
  			}
  			else if(localStorage.getItem('choose_add_ty')=='4')
      		{
      			localStorage.setItem("city_pick_lat",''+this.latitude);
				localStorage.setItem("city_pick_lng",''+this.longitude);
      			localStorage.setItem("city_pickup_add",''+this.currentposition);
      		}
      		else if(localStorage.getItem('choose_add_ty')=='5')
      		{
      			localStorage.setItem("city_drop_lat",''+this.latitude);
				localStorage.setItem("city_drop_lng",''+this.longitude);
				localStorage.setItem("city_drop_add",''+this.currentposition);
      		}
			
		});
		google.maps.event.addListener(this.map, 'click', (event) => {
				
			if (event.cancelable) {
			   event.preventDefault();
			}		
			this.latitude=event.latLng.lat();
			this.longitude=event.latLng.lng();
			
			localStorage.setItem("choose_lng",this.longitude);
			var latlng = new google.maps.LatLng(Number(event.latLng.lat()),Number(event.latLng.lng()));        
			

			if (marker && marker.setMap) {
				marker.setMap(null);
			}
			marker = new google.maps.Marker({
				position: latlng,
				map: this.map,
			});


			let geocoder = new google.maps.Geocoder;
			geocoder.geocode({'location': {'lat': this.latitude,'lng':this.longitude}}, (result, status) => {
				console.log(result);
				this.currentposition=result[0].formatted_address;
				$("#clocation").val(this.currentposition);
				if(localStorage.getItem('choose_add_ty')=='1')
	  			{
	  				localStorage.setItem("pickup_lat",''+this.latitude);
					localStorage.setItem("pickup_lng",''+this.longitude);
					localStorage.setItem("pickup_add",''+this.currentposition);
	  			}
	  			else if(localStorage.getItem('choose_add_ty')=='2')
	      		{
	      			localStorage.setItem("drop_lat",''+this.latitude);
					localStorage.setItem("drop_lng",''+this.longitude);
					localStorage.setItem("drop_add",''+this.currentposition);
	      		}
	      		else if(localStorage.getItem('choose_add_ty')=='3')
  				{
  					localStorage.setItem("choose_lat",''+this.latitude);
					localStorage.setItem("choose_lng",''+this.longitude);
					localStorage.setItem("choose_add",''+this.currentposition);
  				}
  				else if(localStorage.getItem('choose_add_ty')=='4')
	      		{
	      			localStorage.setItem("city_pick_lat",''+this.latitude);
					localStorage.setItem("city_pick_lng",''+this.longitude);
	      			localStorage.setItem("city_pickup_add",''+this.currentposition);
	      		}
	      		else if(localStorage.getItem('choose_add_ty')=='5')
	      		{
	      			localStorage.setItem("city_drop_lat",''+this.latitude);
					localStorage.setItem("city_drop_lng",''+this.longitude);
					localStorage.setItem("city_drop_add",''+this.currentposition);
	      		}
				
			}) 
		});
		google.maps.event.addListener(marker, 'dragend', (event) => {
				this.latitude=marker.getPosition().lat();
				this.longitude=marker.getPosition().lng();
				let geocoder = new google.maps.Geocoder;
				geocoder.geocode({'location': {'lat': this.latitude,'lng':this.longitude}}, (result, status) => {
					this.currentposition=result[0].formatted_address;
					console.log(result);
					$("#clocation").val(this.currentposition);
					if(localStorage.getItem('choose_add_ty')=='1')
		  			{
		  				localStorage.setItem("pickup_lat",''+this.latitude);
						localStorage.setItem("pickup_lng",''+this.longitude);
						localStorage.setItem("pickup_add",''+this.currentposition);
		  			}
		  			else if(localStorage.getItem('choose_add_ty')=='2')
		      		{
		      			localStorage.setItem("drop_lat",''+this.latitude);
						localStorage.setItem("drop_lng",''+this.longitude);
						localStorage.setItem("drop_add",''+this.currentposition);
		      		}
		      		else if(localStorage.getItem('choose_add_ty')=='3')
  					{
  						localStorage.setItem("choose_lat",''+this.latitude);
						localStorage.setItem("choose_lng",''+this.longitude);
						localStorage.setItem("choose_add",''+this.currentposition);
  					}
  					else if(localStorage.getItem('choose_add_ty')=='4')
		      		{
		      			localStorage.setItem("city_pick_lat",''+this.latitude);
						localStorage.setItem("city_pick_lng",''+this.longitude);
		      			localStorage.setItem("city_pickup_add",''+this.currentposition);
		      		}
		      		else if(localStorage.getItem('choose_add_ty')=='5')
		      		{
		      			localStorage.setItem("city_drop_lat",''+this.latitude);
						localStorage.setItem("city_drop_lng",''+this.longitude);
						localStorage.setItem("city_drop_add",''+this.currentposition);
		      		}
					
				}) 
			})
			
		}
		selectlocation()
		{
			this.getcounterycode();  
		}
		getcounterycode()
		{
			this.locationService.chnagetolang(this.currentposition);
			this.location.back();
		}
		gotoback()
		{
		 	this.location.back();
		}

}


