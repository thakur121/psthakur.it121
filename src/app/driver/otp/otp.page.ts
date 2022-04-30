import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {

      otp: any;
	otpone: any;
	otptwo: any;
	otpthree: any;
	otpfour: any;
	userdata = {
		"id": "",
		"phone_code":"",
		"phone_number": "",
		"profile_status":'',
		"otp":""
	};
  	otpshow:any;
  	servicedata: any = [];
  	constructor(public route: Router,public navCtrl: NavController, public rest: RestService) 
  	{
		this.userdata=JSON.parse(localStorage.getItem('Driverdata'));
		this.otpshow=JSON.parse(localStorage.getItem('userOtp'));
  	}
	ngOnInit() 
  	{
		this.userdata=JSON.parse(localStorage.getItem('Driverdata'));
		this.otpshow=JSON.parse(localStorage.getItem('userOtp'));
  	}
      ionViewDidEnter()
      {
            this.userdata=JSON.parse(localStorage.getItem('Driverdata'));
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
  	verifyotpfun()
  	{
            // if (this.otpone == '' || this.otptwo == '' || this.otpthree == '' || this.otpfour == '')
            if (this.otp == '')
            {
               this.rest.presentToast('Please enter valid OTP');
            }
            else
            {
                  // this.otp=this.otpone+''+this.otptwo+''+this.otpthree+''+this.otpfour;
                  this.servicedata = [];
                  this.servicedata.push({"user_id":  this.userdata.id});
                  this.servicedata.push({"otp":  this.otp});
                  this.servicedata.push({"device_token":  localStorage.getItem('pushregistrationid')});
                  this.servicedata.push({"device_type":  '1'});
                  this.rest.serverdataposttwo("phone_verify",this.servicedata).subscribe( res => {
                  this.rest.loadingDismiss();
                        let data:any=res;
                        console.log(data);
                        if(data.status==true)
                        {
                               localStorage.setItem('Driverdata',JSON.stringify(data.data));
                              if(data.data.profile_status=='7')
                              {
                                    localStorage.setItem('isloginuser','2');
                                    this.navCtrl.navigateRoot("/driver-home");
                              }
                              else if(data.data.profile_status=='6')
                              {
                                  //this.navCtrl.navigateRoot("/verifed");
                                    localStorage.setItem('isloginuser','2');
                                    this.navCtrl.navigateRoot("/driver-home");
                              }
                              else if(data.data.profile_status=='5')
                              {
                                   this.navCtrl.navigateRoot("/id-verification");
                              }
                              else if(data.data.profile_status=='4')
                              {
                                   this.navCtrl.navigateRoot("/doc-detls");
                              }
                              else if(data.data.profile_status=='3')
                              {
                                       this.navCtrl.navigateRoot("/vehicle-d");
                              }
                              else if(data.data.profile_status=='2')
                              {
                                   this.navCtrl.navigateRoot("/pdetails");
                              }
                              else if(data.data.profile_status=='1')
                              {
                                   this.navCtrl.navigateRoot("/work");
                              }
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
		// this.otpone='';
  		// this.otptwo='';
  		// this.otpthree='';
  		// this.otpfour='';

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

