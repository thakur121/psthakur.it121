import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VehicleDPage } from './vehicle-d.page';

const routes: Routes = [
  {
    path: '',
    component: VehicleDPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehicleDPageRoutingModule {}
