import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VehicleDPageRoutingModule } from './vehicle-d-routing.module';

import { VehicleDPage } from './vehicle-d.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VehicleDPageRoutingModule
  ],
  declarations: [VehicleDPage]
})
export class VehicleDPageModule {}
