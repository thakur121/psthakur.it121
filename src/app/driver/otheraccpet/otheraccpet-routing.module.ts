import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OtheraccpetPage } from './otheraccpet.page';

const routes: Routes = [
  {
    path: '',
    component: OtheraccpetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtheraccpetPageRoutingModule {}
