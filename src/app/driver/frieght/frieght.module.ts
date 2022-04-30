import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FrieghtPageRoutingModule } from './frieght-routing.module';

import { FrieghtPage } from './frieght.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FrieghtPageRoutingModule
  ],
  declarations: [FrieghtPage]
})
export class FrieghtPageModule {}
