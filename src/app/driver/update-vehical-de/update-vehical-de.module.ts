import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateVehicalDePageRoutingModule } from './update-vehical-de-routing.module';

import { UpdateVehicalDePage } from './update-vehical-de.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateVehicalDePageRoutingModule
  ],
  declarations: [UpdateVehicalDePage]
})
export class UpdateVehicalDePageModule {}
