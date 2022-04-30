import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnterlocationPageRoutingModule } from './enterlocation-routing.module';

import { EnterlocationPage } from './enterlocation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnterlocationPageRoutingModule
  ],
  declarations: [EnterlocationPage]
})
export class EnterlocationPageModule {}
