import { Component,ViewChild,OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NavController,Platform } from '@ionic/angular';
import { LocationService } from "../../location.service";
import { Subscription } from 'rxjs';
import { RestService } from 'src/app/services/rest.service';
import * as $ from "jquery";
import { Location } from "@angular/common";

@Component({
  selector: 'app-enterlocation',
  templateUrl: './enterlocation.page.html',
  styleUrls: ['./enterlocation.page.scss'],
})
export class EnterlocationPage implements OnInit {

      Ridedata={
		"drop_lo":'',
		"drop_lat":'',
		"drop_lng":'',
	}


  	subscription: Subscription;
  	stoplist= [];  
  
  	constructor(public navCtrl: NavController,private location: Location, public rest: RestService,public route: Router,private locationService: LocationService) 
  	{ 
	      var stplist = JSON.parse(localStorage.getItem("stoplist"));
            console.log(stplist);
            if(stplist != null)
            {
                  this.stoplist = stplist;
            }
            else{
                  let fst = {address: "",lat:"",lng:"",id:"0"};  
                  this.stoplist.push(fst);  
                  localStorage.setItem("stoplist", JSON.stringify(this.stoplist));
            }
  		this.subscription = this.locationService.getloc().subscribe(product => {
                  this.loadfun();
      	})
  		this.loadfun();
  	}

  	ngOnInit() {
            var stplist = JSON.parse(localStorage.getItem("stoplist"));
             console.log(stplist);
            if(stplist != null)
            {
                  this.stoplist = stplist;
            }
            else{
                  let fst = {address: "",lat:"",lng:"",id:"0"};  
                  this.stoplist.push(fst);  
                  localStorage.setItem("stoplist", JSON.stringify(this.stoplist));
            }
            this.subscription = this.locationService.getloc().subscribe(product => {
                  this.loadfun();
            })
            this.loadfun();
  	}
  	ionViewDidEnter()
	{
		var stplist = JSON.parse(localStorage.getItem("stoplist"));
            if(stplist != null)
            {
                  this.stoplist = stplist;
            }
            else{
                  let fst = {address: "",lat:"",lng:"",id:"0"};  
                  this.stoplist.push(fst);  
                  localStorage.setItem("stoplist", JSON.stringify(this.stoplist));
            }
            this.subscription = this.locationService.getloc().subscribe(product => {
                  this.loadfun();
            })
            this.loadfun();
	}
	loadfun()
  	{
            this.addRow();
  	}
  	gotochooseaddress(ty,i:any='')
  	{
		localStorage.removeItem("choose_lat");
		localStorage.removeItem("choose_lng");
		localStorage.removeItem("choose_add");
		localStorage.setItem('choose_add_ty',ty);
		localStorage.setItem('row_number_stp',i);
  		this.route.navigate(["/autoadd"]);
  	}
  	addRow()
  	{
  		var val = JSON.parse(localStorage.getItem("stoplist"));
            this.stoplist= JSON.parse(localStorage.getItem("stoplist"));
            var c = [];  var c1 = []; var check1 = 0 ;
      	if(val != '' ||  val != null || val != undefined)
      	{
                  $.each(val,function(field,value) 
                  {

                  	if(Number(value.id) == Number(localStorage.getItem('row_number_stp')))
                  	{
                  		value.address = localStorage.getItem("choose_add");
                  		value.lat = localStorage.getItem("choose_lat");
                  		value.lng = localStorage.getItem("choose_lng");
                       	      c.push(value);
                  	}
                  	else
                  	{
                  		c.push(value);
                  	}
                  });
      	}
      	this.stoplist=c;
      	localStorage.setItem("stoplist", JSON.stringify(c));
  	}
  	
  	gotoaddrow()
  	{	
		let fst = this.stoplist.length;  
      	var val = this.stoplist;
            var c = []; 
            var cblank = 0;
          	$.each(val,function(field,value) 
            {
              	if(value.address == '')
              	{
              		var cblank = 1;
              	}
              	else
              	{
              		c.push(value);
              	}
            });
            if(cblank == 0)
            {
          	 	let f = {address: "",lat:"",lng:"",id:fst};
              	c.push(f);	
            }
       
            this.stoplist=c;
      	localStorage.setItem("stoplist", JSON.stringify(c));
  	}
  	gotoremovecall(id)
  	{
  		var val = JSON.parse(localStorage.getItem("stoplist"));
            var c = [];  var c1 = []; var check1 = 0 ;
      	if(val != '' ||  val != null || val != undefined)
      	{
                  $.each(val,function(field,value) 
                  {
            	     if(Number(value.id) == Number(id))
            	     {
            		
            	     }
            	     else
            	     {
            		    c.push(value);
            	     }
                  });
      	}
      	this.stoplist=c;
      	localStorage.setItem("stoplist", JSON.stringify(c));
  	}
  	gotoback()
  	{
  		this.location.back();
  	}
  	
}

