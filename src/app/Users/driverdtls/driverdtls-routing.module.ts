import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DriverdtlsPage } from './driverdtls.page';

const routes: Routes = [
  {
    path: '',
    component: DriverdtlsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DriverdtlsPageRoutingModule {}
