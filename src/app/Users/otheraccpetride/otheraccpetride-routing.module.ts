import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OtheraccpetridePage } from './otheraccpetride.page';

const routes: Routes = [
  {
    path: '',
    component: OtheraccpetridePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtheraccpetridePageRoutingModule {}
