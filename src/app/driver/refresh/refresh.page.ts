import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-refresh',
  templateUrl: './refresh.page.html',
  styleUrls: ['./refresh.page.scss'],
})
export class RefreshPage implements OnInit {


  firtscall:any=0;
  constructor(public navCtrl: NavController) { 

    if(this.firtscall==0)
    {
          this.firtscall=1;
          this.navCtrl.navigateRoot("/driver-home");
          
    }
  }

  ngOnInit() {
    if(this.firtscall==0)
    {
          this.firtscall=1;
        
          this.navCtrl.navigateRoot("/driver-home");
    }
  }
  ionViewDidEnter()
      {
        if(this.firtscall==0)
    {
          this.firtscall=1;
          this.navCtrl.navigateRoot("/driver-home");
          
    }
      }


}
