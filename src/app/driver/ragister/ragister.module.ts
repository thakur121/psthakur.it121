import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RagisterPageRoutingModule } from './ragister-routing.module';

import { RagisterPage } from './ragister.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RagisterPageRoutingModule
  ],
  declarations: [RagisterPage]
})
export class RagisterPageModule {}
