import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateProfessionalDePageRoutingModule } from './update-professional-de-routing.module';

import { UpdateProfessionalDePage } from './update-professional-de.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateProfessionalDePageRoutingModule
  ],
  declarations: [UpdateProfessionalDePage]
})
export class UpdateProfessionalDePageModule {}
