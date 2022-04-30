import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController,Platform } from '@ionic/angular';

import { RestService } from 'src/app/services/rest.service';


@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

	userdata = {
      	"id": ""
  	};

  	servicedata:any = [];
  	RideList:any=[];
  	firstcall:any=0;
  	constructor(public navCtrl: NavController, public rest: RestService,public route: Router) 
  	{
  		if(this.firstcall==0)
  		{
  			this.firstcall=1;
  			this.loadfun();
  		}
  	}

  	ngOnInit() {
  		if(this.firstcall==0)
  		{
  			this.firstcall=1;
  			this.loadfun();
  		}
  	}
	ionViewDidEnter()
	{
		if(this.firstcall==0)
  		{
  			this.firstcall=1;
  			this.loadfun();
  		}
	}
	loadfun()
	{
	  this.rest.presentLoadingtime();
            this.userdata = JSON.parse(localStorage.getItem('userdata'));
            console.log(this.userdata);
            this.rest.serverdataget("user/get_trips?user_id="+this.userdata.id).subscribe( res => {
			this.rest.loadingDismiss();
			this.firstcall=0;
			let data:any=res;
			console.log(data);
			
			if(data.status==true)
			{
	
			    this.RideList=data.data;
			}
			else
			{
				this.RideList=[];
				
			}
        },error => {
			this.rest.loadingDismiss();
        });
	}
	gotoridedetils(trip,st)
	{
		localStorage.setItem('book_id',trip);
		if(st=='0')
		{
			this.route.navigate(["/selectdriver"]);
		}
		else if(st=='1')
		{
		 	this.route.navigate(["/selectdriver"]);
		}
		else if(st=='3')
		{
		 	this.route.navigate(["/driverdtls"]);
		}
		else if(st=='7')
		{
		 	this.route.navigate(["/driverdtls"]);
		}
		
		else{
			this.route.navigate(["/ridedtl"]);
		}
	}

}
