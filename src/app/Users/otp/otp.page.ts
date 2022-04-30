import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { RestService } from 'src/app/services/rest.service';

declare var google: any;
@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {


	@ViewChild('map',{static: false}) mapElement: ElementRef;

	directionsService = new google.maps.DirectionsService;
  	directionsDisplay = new google.maps.DirectionsRenderer;

	otp: any;
	
	map: any;
	latitude:any;
	longitude:any;
	geocoder:any;
	currentposition:any;


	userdata = {
		"id": "",
		// "otpone":"",
		// "otptwo":"",
		// "otpthree":"",
		// "otpfour":""


	};
	phonedata = {
		"phone_code":"",
		"phone_number": ""
	};
  	otpshow:any;
  	servicedata: any = [];
  	constructor(public route: Router,private geolocation: Geolocation,public navCtrl: NavController, public rest: RestService) 
  	{
		this.loadfun();
		this.userdata=JSON.parse(localStorage.getItem('userdata'));
		this.phonedata=JSON.parse(localStorage.getItem('ragister_number'));
		console.log(this.userdata);
		this.otpshow=JSON.parse(localStorage.getItem('userOtp'));
  	}
	ngOnInit() 
  	{
		this.loadfun();
		this.userdata=JSON.parse(localStorage.getItem('userdata'));
		this.phonedata=JSON.parse(localStorage.getItem('ragister_number'));
		this.otpshow=JSON.parse(localStorage.getItem('userOtp'));
  	}

  	// moveto(currentpos) {
	// 	let nextpos = parseInt(currentpos) + 1;
	// 	let enteredotpdigit = (<HTMLInputElement>document.getElementById("otp" + currentpos)).value;
	// 	if (enteredotpdigit == '') {
	// 	  	return false;
	// 	}
	// 	if (enteredotpdigit >= '10') {
	// 	  	let olddigit = String(enteredotpdigit).charAt(0);
	// 	  	(<HTMLInputElement>document.getElementById("otp" + currentpos)).value = olddigit;
	// 	}
	// 	if (currentpos == '4') {
	// 	 	document.getElementById("otp" + currentpos).blur();
	// 	}
	// 	else {
	// 	  	document.getElementById("otp" + nextpos).focus();
	// 	}
  	// }

	 


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

	loadfun()
	{
		this.userdata = JSON.parse(localStorage.getItem('userdata'));
		this.geolocation.getCurrentPosition({ maximumAge: 3000, timeout: 50000, enableHighAccuracy: true }).then((resp) => {
      			this.loadmap(resp.coords.latitude,resp.coords.longitude);
    		}).catch((error) => {
          	// console.log(error);
      		this.loadfun();
	 	});
	}

  	verifyotpfun()
  	{
        if (this.otp == '')
        {
          	this.rest.presentToast('Please enter valid OTP');
        }
        else
        {
            
			this.servicedata = [];
			this.servicedata.push({"user_id":  this.userdata.id});
			this.servicedata.push({"otp":  this.otp});
			this.servicedata.push({"device_token":  localStorage.getItem('pushregistrationid')});
			this.servicedata.push({"device_type":  '1'});
			this.servicedata.push({"lat":  localStorage.getItem("current_lat" )});
			this.servicedata.push({"lng":  localStorage.getItem("current_lng" )});
			this.rest.serverdataposttwo("phone_verify",this.servicedata).subscribe( res => {
			this.rest.loadingDismiss();
                let data:any=res;
                console.log(data);
                if(data.status==true)
                {
					localStorage.setItem('isloginuser','1');
					localStorage.setItem('userdata',JSON.stringify(data.data));
					this.navCtrl.navigateRoot("/home");
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
  	gotoresendotp()
  	{
		this.otp='';
  	
		this.rest.loadingPresent();
		this.servicedata = [];
		this.servicedata.push({"user_id":  this.userdata.id});
     	this.rest.serverdataposttwo("resendOtp",this.servicedata).subscribe( res => {
			this.rest.loadingDismiss();
			let data:any=res;
			console.log(data);
			if(data.status==true)
			{
              	this.rest.presentToast(data.message);
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
