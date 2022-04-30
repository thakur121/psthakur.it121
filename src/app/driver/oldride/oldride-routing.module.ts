import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OldridePage } from './oldride.page';

const routes: Routes = [
  {
    path: '',
    component: OldridePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OldridePageRoutingModule {}
