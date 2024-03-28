import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HisPediPageRoutingModule } from './his-pedi-routing.module';

import { HisPediPage } from './his-pedi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HisPediPageRoutingModule
  ],
  declarations: [HisPediPage]
})
export class HisPediPageModule {}
