import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateperDePage } from './updateper-de.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateperDePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateperDePageRoutingModule {}
