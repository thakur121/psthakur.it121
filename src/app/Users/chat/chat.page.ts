import { Component,ViewChild,OnInit, ElementRef} from '@angular/core';
import { NavController,Platform,IonContent,AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {


	driverDate={
        "id":"",
        "profile_image":""
  	}
  	chatlist:any=[];
  	servicedata:any = [];
	checkid:any;
	message:any;
	settimeroute:any;
	firtscall:any=0;
  	@ViewChild(IonContent,{static: false}) content: IonContent;
  	constructor(public route: Router,public alertController: AlertController,public navCtrl: NavController, public rest: RestService) 
  	{ 
		if(this.firtscall==0)
        {
			this.firtscall=1;
			this.rest.loadingPresent();
            this.Loaddatafun();
        }
  	}

  	ngOnInit() {
        if(this.firtscall==0)
        {
            this.firtscall=1;
            this.rest.loadingPresent();
            this.Loaddatafun();
        }
  	}
   	ionViewDidEnter()
  	{
        if(this.firtscall==0)
        {
            this.firtscall=1;
            this.rest.loadingPresent();
            this.Loaddatafun();
        }
  	}
  	ionViewWillLeave(){
        clearInterval(this.settimeroute);
	}
  	ionViewDidLeave(){
        clearInterval(this.settimeroute);
    }

  	Loaddatafun()
  	{
  		this.driverDate = JSON.parse(localStorage.getItem('Driverdata'));
  		
   		this.checkid=this.driverDate.id;
       	this.rest.serverdataget("get_all_chat?user_id="+this.driverDate.id).subscribe( res => 
    	{
            this.rest.loadingDismiss();
            let data:any=res;
           	console.log(data);
            if(data.status==true)
            {
            	var newarrey =[];
            	var oldarrey = [];
            	this.chatlist=[];
            	oldarrey = data.data;
            	for (var i = 0; i < oldarrey.length; i++) 
            	{
            		oldarrey[i].checkid = this.driverDate.id;
				  	this.chatlist.push(oldarrey[i]);
				}
				
				this.content.scrollToBottom(-3002); 
				this.setinterval();  
            }
             
    	},error => {
        	this.rest.loadingDismiss();
   		});
  	}
  	setinterval()
    {
        this.settimeroute= setInterval(() => {
            this.Loaddatafun();
        }, 9000);
    }
  	sendMessage() {
   		if(this.message == '')
   		{

   		}
   		else
   		{
			this.rest.loadingPresent();
            this.servicedata = [];
            this.servicedata.push({"sender_id":  this.driverDate.id});
            this.servicedata.push({"message":  this.message});
			this.rest.serverdataposttwo("send_message",this.servicedata).subscribe( res => {
                this.rest.loadingDismiss();
                let data:any=res;
                console.log(data);
                if(data.status==true)
                {
                	this.message = '';
                	this.Loaddatafun();
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
  	gotobackfun()
  	{
  		if( localStorage.getItem('isloginuser') == "1")
        {
            this.navCtrl.navigateRoot("/menu");
        }
        else
        {
            this.navCtrl.navigateRoot("/driver-menu");
        }
  	}

}
