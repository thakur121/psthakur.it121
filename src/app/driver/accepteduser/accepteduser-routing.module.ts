import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccepteduserPage } from './accepteduser.page';

const routes: Routes = [
  {
    path: '',
    component: AccepteduserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccepteduserPageRoutingModule {}
