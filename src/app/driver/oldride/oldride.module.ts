import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OldridePageRoutingModule } from './oldride-routing.module';

import { OldridePage } from './oldride.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OldridePageRoutingModule
  ],
  declarations: [OldridePage]
})
export class OldridePageModule {}
