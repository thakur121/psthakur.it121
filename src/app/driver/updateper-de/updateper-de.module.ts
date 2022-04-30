import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateperDePageRoutingModule } from './updateper-de-routing.module';

import { UpdateperDePage } from './updateper-de.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateperDePageRoutingModule
  ],
  declarations: [UpdateperDePage]
})
export class UpdateperDePageModule {}
