import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DriverRideDetailsPageRoutingModule } from './driver-ride-details-routing.module';

import { DriverRideDetailsPage } from './driver-ride-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DriverRideDetailsPageRoutingModule
  ],
  declarations: [DriverRideDetailsPage]
})
export class DriverRideDetailsPageModule {}
