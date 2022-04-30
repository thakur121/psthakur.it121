import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OtheraccpetPageRoutingModule } from './otheraccpet-routing.module';

import { OtheraccpetPage } from './otheraccpet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OtheraccpetPageRoutingModule
  ],
  declarations: [OtheraccpetPage]
})
export class OtheraccpetPageModule {}
