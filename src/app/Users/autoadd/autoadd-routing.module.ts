import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AutoaddPage } from './autoadd.page';

const routes: Routes = [
  {
    path: '',
    component: AutoaddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AutoaddPageRoutingModule {}
