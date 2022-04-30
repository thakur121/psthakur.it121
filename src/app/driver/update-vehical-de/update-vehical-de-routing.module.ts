import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateVehicalDePage } from './update-vehical-de.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateVehicalDePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateVehicalDePageRoutingModule {}
