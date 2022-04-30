import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompleteridePage } from './completeride.page';

const routes: Routes = [
  {
    path: '',
    component: CompleteridePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompleteridePageRoutingModule {}
