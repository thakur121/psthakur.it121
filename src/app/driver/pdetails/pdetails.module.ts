import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PdetailsPageRoutingModule } from './pdetails-routing.module';

import { PdetailsPage } from './pdetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PdetailsPageRoutingModule
  ],
  declarations: [PdetailsPage]
})
export class PdetailsPageModule {}
