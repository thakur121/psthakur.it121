import { Component } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';
import { Platform,AlertController } from '@ionic/angular';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NavController } from '@ionic/angular';
import { NotificationService } from "src/app/notification.service";

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss'],
})
export class AppComponent {
      driverDate={
            "id":"",
            "profile_image":"",
            "is_busy":""
      }
      settimeinter:any;
      geocoder:any;
  	constructor( private notiser:NotificationService,private splashScreen: SplashScreen,public navCtrl: NavController,private statusBar: StatusBar,private platform: Platform,private push: Push,public alertController: AlertController,
  	private locationAccuracy: LocationAccuracy,public rest: RestService,public route: Router,private androidPermissions: AndroidPermissions,private geolocation: Geolocation) 
  	{
  		this.initializeApp();
  	}
  	initializeApp() {
	  	this.platform.ready().then(() => {
	          	setTimeout(() => {
	                this.splashScreen.hide();
	            }, 2000)
	  	});

	    	setTimeout(() => {
	            this.permissionfun();
	           	this.initFirebase();
                  this.setinterval();
		}, 6000);
		this.platform.backButton.subscribe(()=>{
	            let href = this.route.url;
	             if(href=="/home")
	            {
	                this.presentAlertConfirm();
	            }
                  if(href=="/driver-home")
                  {
                      this.presentAlertConfirm();
                  }
	  	});
            if( localStorage.getItem('isloginuser') == "1")
            {
                  this.navCtrl.navigateRoot("/home");
                  //this.navCtrl.navigateRoot("/otheraccpetride");
            }
            else if( localStorage.getItem('isloginuser') == "2")
            {
                  this.navCtrl.navigateRoot("/driver-home");
                  //this.navCtrl.navigateRoot("/accepteduser");
            }
            else
            {
                  this.navCtrl.navigateRoot("/login");
            }
            localStorage.removeItem("pickup_lat");
            localStorage.removeItem("pickup_lng");
            localStorage.removeItem("pickup_add");    
            localStorage.removeItem("drop_lat");
            localStorage.removeItem("drop_lng");
            localStorage.removeItem("drop_add");
            localStorage.removeItem("choose_add");
            localStorage.removeItem("choose_lat");
            localStorage.removeItem("choose_lng");
            localStorage.removeItem("stoplist")
        	
	}
	permissionfun()
  	{
        	this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
                  result => {
			if (result.hasPermission) {
			    	this.askToTurnOnGPS();
			} else {
			      this.requestGPSPermission();
			}
        	},err => {
              	this.getLocationCoordinates();
        	});
  	}
  	requestGPSPermission() {
        	this.locationAccuracy.canRequest().then((canRequest: boolean) => {
			if (canRequest) {
			   
			} 
			else 
			{
                        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
			          .then(() => {
			           this.askToTurnOnGPS();
		            },error => {
			           console.log(error);
			     });
			}
        	});
  	}
    	askToTurnOnGPS() {
        	this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
          	() => {
			this.getLocationCoordinates()
        	});
    	}
  	getLocationCoordinates() {
        	this.geolocation.getCurrentPosition().then((resp) => {
            	localStorage.setItem("current_lat",''+resp.coords.latitude);
            	localStorage.setItem("current_lng",''+resp.coords.longitude);
            }).catch((error) => {
                  console.log('Error getting location' + error);
        	});
    	}
      initFirebase(){
            const options: PushOptions = {
                  android: {},
                  ios: {
                        alert: 'true',
                        badge: false,
                        sound: 'true'
                  }
            };
            const pushObject: PushObject = this.push.init(options);
            pushObject.on('notification').subscribe((notification: any) => {
                  console.log('Received a notification', notification);
                  this.rest.presentToast(notification.message);
                  // alert('success')
                  // alert(JSON.stringify(notification.additionalData))
                  if(notification.additionalData.key=='Complete_Ride')
                  {
                        this.notiser.chnagetolang('');
                        localStorage.setItem('book_id',notification.additionalData.trip_id);
                        this.navCtrl.navigateRoot("/driverdtls");
                  }
                  else if(notification.additionalData.key=='start_ride')
                  {

                        this.notiser.chnagetolang('');
                        localStorage.setItem('book_id',notification.additionalData.trip_id);
                        this.navCtrl.navigateRoot("/driverdtls");
                  }
                  else if(notification.additionalData.key=='New_Rides')
                  {
                        this.navCtrl.navigateRoot("/drive-home");
                        this.notiser.chnagetolang('');      
                  }
                  else if(notification.additionalData.key=='Accept_Ride')
                  {
                        this.navCtrl.navigateRoot("/drive-home");
                        this.notiser.chnagetolang('');   
                  }
            });
            pushObject.on('registration').subscribe((registration: any) => {
                  localStorage.setItem("pushregistrationid", registration.registrationId);
            });
            pushObject.on('error').subscribe(error => {
                  console.error('Error with Push plugin', error);
            });
      }
      async presentAlertConfirm() {
            const alert = await this.alertController.create({
                  cssClass: 'my-custom-class',
                  header: 'Confirm!',
                  message: 'Are you sure  you went to leave this app',
                  buttons: [{
                        text: 'Cancel',
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: (blah) => {
                              console.log('Confirm Cancel: blah');
                        }
                  }, {
                        text: 'Yes',
                        handler: () => {
                              navigator['app'].exitApp(); 
                        }
                  }]
            });
            await alert.present();
      }

      setinterval()
      {
            this.settimeinter = setInterval(() => {
                  if(localStorage.getItem('isloginuser') == "2")
                  {
                        this.driverupdate();
                  }
            }, 30000);
      }
      driverupdate()
      {
            this.geolocation.getCurrentPosition({ maximumAge: 3000, timeout: 50000, enableHighAccuracy: true }).then((resp) => {
                  localStorage.setItem("current_lat",''+resp.coords.latitude);
                  localStorage.setItem("current_lng",''+resp.coords.longitude);
                  this.driverDate = JSON.parse(localStorage.getItem('Driverdata'));
                  this.updatepro(resp.coords.latitude,resp.coords.longitude);
            }).catch((error) => {
                  this.driverupdate();
            });

      }
      updatepro(lat,lng)
      {
            var servicedata = [];
            servicedata.push({"latitude":  lat});
            servicedata.push({"longitude":  lng});
            servicedata.push({"device_type":  'android'});
            servicedata.push({"device_token":  localStorage.getItem("pushregistrationid")});
            servicedata.push({"driver_id":  this.driverDate.id});
            this.rest.serverdataposttwo("driver/post_location",servicedata).subscribe( res => {
                       
               },error => {
                  this.rest.presentToast("Something went wrong");
            });
      }
}
