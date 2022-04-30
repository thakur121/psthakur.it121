import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StartridePageRoutingModule } from './startride-routing.module';

import { StartridePage } from './startride.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StartridePageRoutingModule
  ],
  declarations: [StartridePage]
})
export class StartridePageModule {}
