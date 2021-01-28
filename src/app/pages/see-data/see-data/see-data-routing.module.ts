import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeeDataPage } from './see-data.page';

const routes: Routes = [
  {
    path: '',
    component: SeeDataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeeDataPageRoutingModule {}
