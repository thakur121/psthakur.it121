import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OtheraccpetridePageRoutingModule } from './otheraccpetride-routing.module';

import { OtheraccpetridePage } from './otheraccpetride.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OtheraccpetridePageRoutingModule
  ],
  declarations: [OtheraccpetridePage]
})
export class OtheraccpetridePageModule {}
