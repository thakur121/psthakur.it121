import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FrieghtPage } from './frieght.page';

const routes: Routes = [
  {
    path: '',
    component: FrieghtPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FrieghtPageRoutingModule {}
