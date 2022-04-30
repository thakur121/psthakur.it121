import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

import { RestService } from 'src/app/services/rest.service';
import * as $ from "jquery";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

      data:any='';
      driverDate = {
          "id": "",
          "user_id":"",
          "phone_number":""
      };
      
     PaymentData ={
            "months_amount":"",
            "months_payments":"",
            "todays_amount":"",
            "todays_payments":"",
            "total_amount":"",
            "total_payments":""
      }
      firstcall:any=0;
      servicedata: any;
      emargencypopup:any=0; 

      constructor(public navCtrl: NavController, public rest: RestService,public route: Router)
      { 
            if(this.firstcall==0)
            {
                  this.firstcall=1;
                  this.loadpagefun(); 
            }
      }
  
      ngOnInit()
      {
            if(this.firstcall==0)
            {
                  this.firstcall=1;
                  this.loadpagefun(); 
            }
      }

      ionViewDidEnter()
  	{
            if(this.firstcall==0)
            {
                  this.firstcall=1; 
                  this.loadpagefun();
            }
  	}

      loadpagefun()
      {
            this.driverDate = JSON.parse(localStorage.getItem('Driverdata'));
            console.log(this.driverDate)
            
            this.rest.presentLoadingtime();
            this.rest.serverdataget("get-payment-details?driver_id="+this.driverDate.id).subscribe( res => {
            this.rest.loadingDismiss();
            this.firstcall=0;
            let data:any=res;
            console.log(data)
            if(data.status==true)
            {
             this.PaymentData= data.data; 
             console.log(this.PaymentData) 
       
            }
            },error => {
                  this.rest.loadingDismiss();
            });
      }
}
