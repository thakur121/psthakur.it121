import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkingtypePage } from './workingtype.page';

const routes: Routes = [
  {
    path: '',
    component: WorkingtypePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkingtypePageRoutingModule {}
