import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompleteridePageRoutingModule } from './completeride-routing.module';

import { CompleteridePage } from './completeride.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompleteridePageRoutingModule
  ],
  declarations: [CompleteridePage]
})
export class CompleteridePageModule {}
