import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientePage } from './cliente.page';

const routes: Routes = [
  {
    path: '',
    component: ClientePage
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'edit-p',
    loadChildren: () => import('./edit-p/edit-p.module').then( m => m.EditPPageModule)
  },
  {
    path: 'his-pedi',
    loadChildren: () => import('./his-pedi/his-pedi.module').then( m => m.HisPediPageModule)
  },
  {
    path: 'pedido',
    loadChildren: () => import('./pedido/pedido.module').then( m => m.PedidoPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientePageRoutingModule {}
