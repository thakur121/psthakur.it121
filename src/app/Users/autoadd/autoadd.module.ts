import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AutoaddPageRoutingModule } from './autoadd-routing.module';

import { AutoaddPage } from './autoadd.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AutoaddPageRoutingModule
  ],
  declarations: [AutoaddPage]
})
export class AutoaddPageModule {}
