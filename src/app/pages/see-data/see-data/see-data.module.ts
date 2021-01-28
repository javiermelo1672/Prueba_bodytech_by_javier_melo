import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeeDataPageRoutingModule } from './see-data-routing.module';

import { SeeDataPage } from './see-data.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeeDataPageRoutingModule
  ],
  declarations: [SeeDataPage]
})
export class SeeDataPageModule {}
