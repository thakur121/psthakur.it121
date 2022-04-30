import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DriverdtlsPageRoutingModule } from './driverdtls-routing.module';

import { DriverdtlsPage } from './driverdtls.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DriverdtlsPageRoutingModule
  ],
  declarations: [DriverdtlsPage]
})
export class DriverdtlsPageModule {}
