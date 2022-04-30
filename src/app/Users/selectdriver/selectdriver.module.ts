import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectdriverPageRoutingModule } from './selectdriver-routing.module';

import { SelectdriverPage } from './selectdriver.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectdriverPageRoutingModule
  ],
  declarations: [SelectdriverPage]
})
export class SelectdriverPageModule {}
