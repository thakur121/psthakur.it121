import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerifedPageRoutingModule } from './verifed-routing.module';

import { VerifedPage } from './verifed.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerifedPageRoutingModule
  ],
  declarations: [VerifedPage]
})
export class VerifedPageModule {}
