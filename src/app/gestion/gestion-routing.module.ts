import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './clientes/pages/clientes/clientes.component';
import { ColegiosComponent } from './colegios/pages/colegios/colegios.component';
import { DetalleClienteComponent } from './clientes/pages/detalle-cliente/detalle-cliente.component';
import { AuthGuard } from '../auth/guard/auth.guard';
import { DetalleColegiosComponent } from './colegios/pages/detalle-colegios/detalle-colegios.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'clientes', component: ClientesComponent },
      { path: 'cliente/:id', component: DetalleClienteComponent },
      { path: 'colegios', component: ColegiosComponent, canActivate: [ AuthGuard] },
      { path: 'colegio/:id', component: DetalleColegiosComponent, canActivate: [ AuthGuard] },
      { path: '**', redirectTo: 'clientes' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionRoutingModule { }
