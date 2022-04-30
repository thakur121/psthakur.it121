import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";

@Component({
  selector: 'app-support',
  templateUrl: './support.page.html',
  styleUrls: ['./support.page.scss'],
})
export class SupportPage implements OnInit {

      constructor(private location: Location) { }

      ngOnInit() {
      }

      gotoback()
      {
            this.location.back();
      }
}
