import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectdriverPage } from './selectdriver.page';

const routes: Routes = [
  {
    path: '',
    component: SelectdriverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectdriverPageRoutingModule {}
