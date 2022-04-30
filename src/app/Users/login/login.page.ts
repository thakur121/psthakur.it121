import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

      userdata = {
            "id": "",
            "phone_code":"+507",
            "phone": ""
      };
      servicedata: any;
      constructor(public route: Router,public navCtrl: NavController, public rest: RestService) 
      { 

      }
      ngOnInit() {
      }
      gotologin()
      {
            if (this.userdata.phone_code =='') 
            {
                  this.rest.presentToast("Please choose phone code");
            }
            else if (this.userdata.phone =='') 
            {
                  this.rest.presentToast("Please enter phone number");
            }
            else 
            {
                  this.rest.loadingPresent();
                  this.servicedata = [];
                  this.servicedata.push({"phone_number":  this.userdata.phone});
                  this.servicedata.push({"role":  '2'});
                  this.servicedata.push({"device_token":  localStorage.getItem('pushregistrationid')});
                  this.servicedata.push({"device_type":  '1'});
                  this.rest.serverdataposttwo("check_phone",this.servicedata).subscribe( res => {
                        this.rest.loadingDismiss();
                        let data:any=res;
                        console.log(data);
                        if(data.status==true)
                        {
                              let phn = this.userdata.phone;
                              let phonedata= {
                                    "phone_code":this.userdata.phone_code,
                                    "phone_number": phn.toString()
                              }
                              localStorage.setItem('ragister_number',JSON.stringify(phonedata));
                              localStorage.setItem('userdata',JSON.stringify(data.data));
                              this.route.navigate(["/otp"]);
                        }
                        else if(data.status==0)
                        {
                              let phn = this.userdata.phone;
                              let phonedata= {
                                    "phone_code":this.userdata.phone_code,
                                    "phone_number": phn.toString()
                              }
                              localStorage.setItem('ragister_number',JSON.stringify(phonedata));
                              this.route.navigate(["/ragister"]);

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

