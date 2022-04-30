import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DocDetlsPageRoutingModule } from './doc-detls-routing.module';

import { DocDetlsPage } from './doc-detls.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DocDetlsPageRoutingModule
  ],
  declarations: [DocDetlsPage]
})
export class DocDetlsPageModule {}
