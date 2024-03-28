import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditPPage } from './edit-p.page';

const routes: Routes = [
  {
    path: '',
    component: EditPPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditPPageRoutingModule {}
