import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkingtypePageRoutingModule } from './workingtype-routing.module';

import { WorkingtypePage } from './workingtype.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkingtypePageRoutingModule
  ],
  declarations: [WorkingtypePage]
})
export class WorkingtypePageModule {}
