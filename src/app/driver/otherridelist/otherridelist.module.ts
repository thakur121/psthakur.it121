import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OtherridelistPageRoutingModule } from './otherridelist-routing.module';

import { OtherridelistPage } from './otherridelist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OtherridelistPageRoutingModule
  ],
  declarations: [OtherridelistPage]
})
export class OtherridelistPageModule {}
