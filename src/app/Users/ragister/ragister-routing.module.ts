import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RagisterPage } from './ragister.page';

const routes: Routes = [
  {
    path: '',
    component: RagisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RagisterPageRoutingModule {}
