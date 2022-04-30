import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserReviewPageRoutingModule } from './user-review-routing.module';

import { UserReviewPage } from './user-review.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserReviewPageRoutingModule
  ],
  declarations: [UserReviewPage]
})
export class UserReviewPageModule {}
