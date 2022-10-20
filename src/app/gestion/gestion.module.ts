import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HelpersModule } from '../helpers/helpers.module';

import { GestionRoutingModule } from './gestion-routing.module';
import { ClientesComponent } from './clientes/pages/clientes/clientes.component';
import { DetalleClienteComponent } from './clientes/pages/detalle-cliente/detalle-cliente.component';
import { ColegiosComponent } from './colegios/pages/colegios/colegios.component';
import { DetalleColegiosComponent } from './colegios/pages/detalle-colegios/detalle-colegios.component';



@NgModule({
  declarations: [
    ClientesComponent,
    DetalleClienteComponent,
    ColegiosComponent,
    DetalleColegiosComponent

  ],
  imports: [
    CommonModule,
    GestionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HelpersModule,

  ]
})
export class GestionModule { }
