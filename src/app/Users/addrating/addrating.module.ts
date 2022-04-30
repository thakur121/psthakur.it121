import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddratingPageRoutingModule } from './addrating-routing.module';

import { AddratingPage } from './addrating.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddratingPageRoutingModule
  ],
  declarations: [AddratingPage]
})
export class AddratingPageModule {}
