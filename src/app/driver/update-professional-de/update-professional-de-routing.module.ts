import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateProfessionalDePage } from './update-professional-de.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateProfessionalDePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateProfessionalDePageRoutingModule {}
