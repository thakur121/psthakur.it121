import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocDetlsPage } from './doc-detls.page';

const routes: Routes = [
  {
    path: '',
    component: DocDetlsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocDetlsPageRoutingModule {}
