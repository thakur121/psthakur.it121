import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RidedtlPage } from './ridedtl.page';

const routes: Routes = [
  {
    path: '',
    component: RidedtlPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RidedtlPageRoutingModule {}
