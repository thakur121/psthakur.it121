import { Component,ViewChild,OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NavController,AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';


@Component({
  selector: 'app-otherridelist',
  templateUrl: './otherridelist.page.html',
  styleUrls: ['./otherridelist.page.scss'],
})
export class OtherridelistPage implements OnInit {

	driverDate={
		"id":""
  	}
    
  	servicedata: any;
	RideList:any=[];
	firtscall:any=0;
	driverstatus:any=1;
	constructor(public route: Router,public navCtrl: NavController, public rest: RestService) 
  	{ 
		if(this.firtscall==0)
        {
			this.firtscall=1;
			this.Loaddatafun();
        }
  	}

  	ngOnInit() {
        if(this.firtscall==0)
        {
			this.firtscall=1;
			this.Loaddatafun();
        }
  	}
	ionViewDidEnter()
  	{
        if(this.firtscall==0)
        {
          	this.firtscall=1;
          	this.Loaddatafun();
              
        }
  	}

  	Loaddatafun()
  	{
	 	this.driverDate=JSON.parse(localStorage.getItem('Driverdata'));
		 console.log(this.driverDate);
	 	this.rest.loadingPresent();
      	this.rest.serverdataget("get_other_trips?driver_id="+this.driverDate.id).subscribe( res => {
               this.rest.loadingDismiss();
               let data:any=res;
               console.log(data);
			  
               if(data.status==true)
               {
				   
                    this.RideList=data.data;
					
               }
			   
      	},error => {
           	this.rest.loadingDismiss();
      	});
  	}

// 	  otherrideaccept(rl:any){
// 		console.log(rl);  
// 		if(rl.status=='1')
// 		{
// 			  localStorage.setItem('other_book_id',rl.trip_id)
// 			  this.navCtrl.navigateRoot("/accepteduser");
// 		}
// 		else if(rl.status=='2')
// 		{
// 			  localStorage.setItem('other_book_id',rl.trip_id)
// 			  this.navCtrl.navigateRoot("/otherridelist");
// 		}
//   }
	otherrideaccept(id:any)
	{
		localStorage.setItem('other_book_id',JSON.stringify(id));
		this.route.navigate(["/accepteduser"]);
		
	}	
}
