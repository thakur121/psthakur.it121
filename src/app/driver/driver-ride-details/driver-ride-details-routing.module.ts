import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DriverRideDetailsPage } from './driver-ride-details.page';

const routes: Routes = [
  {
    path: '',
    component: DriverRideDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DriverRideDetailsPageRoutingModule {}
