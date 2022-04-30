import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerifedPage } from './verifed.page';

const routes: Routes = [
  {
    path: '',
    component: VerifedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerifedPageRoutingModule {}
