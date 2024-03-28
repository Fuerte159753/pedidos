import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AppTabsComponent } from './app-tabs/app-tabs.component';

import { ClientePageRoutingModule } from './cliente-routing.module';

import { ClientePage } from './cliente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientePageRoutingModule
  ],
  declarations: [ClientePage, AppTabsComponent]
})
export class ClientePageModule {}
