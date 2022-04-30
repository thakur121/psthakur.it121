import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChoosedriverPage } from './choosedriver.page';

const routes: Routes = [
  {
    path: '',
    component: ChoosedriverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChoosedriverPageRoutingModule {}
