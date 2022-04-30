import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-ragister',
  templateUrl: './ragister.page.html',
  styleUrls: ['./ragister.page.scss'],
})
export class RagisterPage implements OnInit {

	userdata = {
		"fname":"",
		"lname":"",
		"email":""
	};
	phonedata = {
		"phone_code":'',
		"phone_number": 0,
	}
  	servicedata: any;
  	constructor(public route: Router,public navCtrl: NavController, public rest: RestService) 
  	{ 
  		this.phonedata=JSON.parse(localStorage.getItem('ragister_number'));
  	}

  	ngOnInit() {
  		this.phonedata=JSON.parse(localStorage.getItem('ragister_number'));
  	}

	  isValidEmailAddress(emailAddress:any) 
      {
            var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
            return pattern.test(emailAddress);
      }

  	addragister()
  	{
		if (this.userdata.fname =='') 
		{
			this.rest.presentToast("Please enter the first name");
		}
		else if (this.userdata.lname =='') 
		{
			this.rest.presentToast("Please enter the last name");
		}
		else if (this.userdata.email =='') 
		{
			this.rest.presentToast("Please enter email");
		}
		else if(this.isValidEmailAddress(this.userdata.email) == false)
		{
			  this.rest.presentToast("Please Enter valid Email");
		}
		else 
		{
			this.rest.loadingPresent();
			this.servicedata = [];
			this.servicedata.push({"email":  this.userdata.email});
			this.servicedata.push({"first_name":  this.userdata.fname});
			this.servicedata.push({"last_name":  this.userdata.lname});
			this.servicedata.push({"device_type":  '1'});
			this.servicedata.push({"device_token":  localStorage.getItem('pushregistrationid')});
			this.servicedata.push({"phone_number":  this.phonedata.phone_number});
			this.servicedata.push({"phone_code":  this.phonedata.phone_code});
          	this.servicedata.push({"role":  '2'});
			
			this.rest.serverdataposttwo("sign_up",this.servicedata).subscribe( res => {
          		this.rest.loadingDismiss();
	              let data:any=res;
	              console.log(data);
              		if(data.status==true)
              		{
	                    this.rest.presentToast(data.message);
	                    this.userdata = {
	                      	"email": "",
							"fname": "",
							"lname": ""
	                    };
	                   
                        let phonedata= {
                            "phone_code":this.phonedata.phone_code,
                            "phone_number": this.phonedata.phone_number,
                            "id":data.data.id
                        }
                        localStorage.setItem('userdata',JSON.stringify(phonedata));
	                    this.route.navigate(["/otp"]);
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

}
