import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.page.html',
	styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

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
		
  	}
	ngOnInit() 
  	{
		this.userdata=JSON.parse(localStorage.getItem('Driverdata'));
		
  	}

  	gotoprofileupdate(ty:any) {
  		
  		this.userdata=JSON.parse(localStorage.getItem('Driverdata'));

		this.rest.loadingPresent();
        this.rest.serverdataget("get_profile_details?id="+this.userdata.id).subscribe( res => {
			this.rest.loadingDismiss();
			let data:any=res;
			console.log(data);
			if(data.status==true)
			{
				localStorage.setItem('Profile_data',JSON.stringify(data.data));
			    if(ty=='1')
			    {
			    	this.route.navigate(["/workingtype"]);
			    }
			    else if(ty=='2')
			    {
			    	this.route.navigate(["/updateper-de"]);
			    }
			    else if(ty=='3')
			    {
			    	this.route.navigate(["/update-vehical-de"]);
			    }
			    else
			    {
			    	this.route.navigate(["/update-professional-de"]);	
			    }	
			}
    	},error => {
           	this.rest.loadingDismiss();
    	});
  		
  	}

}
