import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChoosedriverPageRoutingModule } from './choosedriver-routing.module';

import { ChoosedriverPage } from './choosedriver.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChoosedriverPageRoutingModule
  ],
  declarations: [ChoosedriverPage]
})
export class ChoosedriverPageModule {}
