import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnterlocationPage } from './enterlocation.page';

const routes: Routes = [
  {
    path: '',
    component: EnterlocationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnterlocationPageRoutingModule {}
