import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HisPediPage } from './his-pedi.page';

const routes: Routes = [
  {
    path: '',
    component: HisPediPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HisPediPageRoutingModule {}
