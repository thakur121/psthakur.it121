import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

import { RestService } from 'src/app/services/rest.service';
@Component({
  selector: 'app-work',
  templateUrl: './work.page.html',
  styleUrls: ['./work.page.scss'],
})
export class WorkPage implements OnInit {

	activetype:any='';
	catlist:any=[];
  	servicedata: any = [];
  	firstcall:any=0;
  	userdata = {
		"id": ''		
	};
  	constructor(public route: Router,public navCtrl: NavController, public rest: RestService) 
  	{
		this.userdata=JSON.parse(localStorage.getItem('Driverdata'));
		this.loadpagefun();
  	}
	ngOnInit() 
  	{
		this.userdata=JSON.parse(localStorage.getItem('Driverdata'));
		this.loadpagefun();
  	}

  	loadpagefun() {
  		if(this.firstcall==0)
  		{
  			this.firstcall=1;
  			this.rest.loadingPresent();
               this.rest.serverdataget("get_categories").subscribe( res => {
				this.rest.loadingDismiss();
				let data:any=res;
				console.log(data);
				if(data.status==true)
				{
				    this.catlist=data.data;
				}
	        	},error => {
	               	this.rest.loadingDismiss();
	        });
  		}
  	}
  	activetypefun(id)
  	{
  		this.activetype=id;
  	}
  	gotoaddcat()
  	{
          this.userdata=JSON.parse(localStorage.getItem('Driverdata'));
          this.servicedata = [];
          this.servicedata.push({"user_id":  this.userdata.id});
          this.servicedata.push({"cat_id":  this.activetype});
          this.rest.serverdataposttwo("add_category_type",this.servicedata).subscribe( res => {
               this.rest.loadingDismiss();
               let data:any=res;
               console.log(data);
               if(data.status==true)
               {
                   this.route.navigate(["/pdetails"]);
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
