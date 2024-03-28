import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditPPageRoutingModule } from './edit-p-routing.module';

import { EditPPage } from './edit-p.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EditPPageRoutingModule
  ],
  declarations: [EditPPage]
})
export class EditPPageModule {}
