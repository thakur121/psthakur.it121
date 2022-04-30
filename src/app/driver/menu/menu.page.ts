import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  	constructor(public route: Router,public navCtrl: NavController) { }

  	ngOnInit() {
  	}
  	gotosecondride(ty)
  	{
  		localStorage.setItem('Secound_ride_type',''+ty);
  		this.route.navigate(["/city"]);
  	}
   gotologoutfun()
    {
      localStorage.removeItem('userdata');
       localStorage.removeItem('Driverdata');
      this.navCtrl.navigateRoot("/dlogin");
    }
   gotouserfun()
    {
        localStorage.removeItem('userdata');
       localStorage.removeItem('Driverdata');
      this.navCtrl.navigateRoot("/login");
    }
}
