import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyearningsPage } from './myearnings.page';

const routes: Routes = [
  {
    path: '',
    component: MyearningsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyearningsPageRoutingModule {}
