import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RidedtlPageRoutingModule } from './ridedtl-routing.module';

import { RidedtlPage } from './ridedtl.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RidedtlPageRoutingModule
  ],
  declarations: [RidedtlPage]
})
export class RidedtlPageModule {}
