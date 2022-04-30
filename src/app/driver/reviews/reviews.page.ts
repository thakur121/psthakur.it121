import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.page.html',
  styleUrls: ['./reviews.page.scss'],
})
export class ReviewsPage implements OnInit {

      data:any='';
      driverDate = {
          "id": "",
          "user_id":"",
          "rating":"",
          "review":"",
      };

      ReviewData ={
            "avgRating":"",
            "review_count":"",
            "payments_count":"",
            "rides_count":"",
            "total_amount":"",

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
            this.rest.serverdataget("get-driver-dashboard?driver_id="+this.driverDate.id).subscribe( res => {
            this.rest.loadingDismiss();
            this.firstcall=0;
            let data: any=res;
            console.log(data);
            if(data.status==true)
            {
            this.ReviewData=data.data;
             console.log(this.ReviewData);         
            }
            },error => {
                  this.rest.loadingDismiss();
            });
      }


       
}
