import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IntercityPageRoutingModule } from './intercity-routing.module';

import { IntercityPage } from './intercity.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IntercityPageRoutingModule
  ],
  declarations: [IntercityPage]
})
export class IntercityPageModule {}
