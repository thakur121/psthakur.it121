import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyearningsPageRoutingModule } from './myearnings-routing.module';

import { MyearningsPage } from './myearnings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyearningsPageRoutingModule
  ],
  declarations: [MyearningsPage]
})
export class MyearningsPageModule {}
