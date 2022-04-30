import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddratingPage } from './addrating.page';

const routes: Routes = [
  {
    path: '',
    component: AddratingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddratingPageRoutingModule {}
