import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccepteduserPageRoutingModule } from './accepteduser-routing.module';

import { AccepteduserPage } from './accepteduser.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccepteduserPageRoutingModule
  ],
  declarations: [AccepteduserPage]
})
export class AccepteduserPageModule {}
