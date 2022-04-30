import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StartridePage } from './startride.page';

const routes: Routes = [
  {
    path: '',
    component: StartridePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StartridePageRoutingModule {}
