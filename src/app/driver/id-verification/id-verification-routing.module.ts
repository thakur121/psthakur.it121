import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IdVerificationPage } from './id-verification.page';

const routes: Routes = [
  {
    path: '',
    component: IdVerificationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IdVerificationPageRoutingModule {}
