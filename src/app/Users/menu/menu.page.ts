import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }
  	gotologoutfun()
  	{
  		localStorage.removeItem('userdata');
  		 localStorage.removeItem('Driverdata');
  		this.navCtrl.navigateRoot("/login");
  	}
    gotodriverfun()
    {
        localStorage.removeItem('userdata');
       localStorage.removeItem('Driverdata');
      this.navCtrl.navigateRoot("/dlogin");
    }
}
