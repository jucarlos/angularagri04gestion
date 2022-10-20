import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Cliente } from '../../interfaces/interfaces';
import { ClienteService } from '../../services/cliente.service';
import { AuthService } from '../../../../auth/service/auth.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] = [];
  totalRegistros = 0;
  desde = 0;
  termino = '';

  cargando = true;

  constructor(private clienteService: ClienteService, public authService: AuthService) { }

  ngOnInit(): void {
    this.cargarClientes();
  }



  cargarClientes() {

    this.cargando = true;
    this.termino = '';
    this.clienteService.listar(this.desde || 0)
      .subscribe( (resp: any) => {
        this.totalRegistros = resp.total;
        this.clientes = resp.clientes;
        this.cargando = false;
      });
  }


  buscarCliente( ) {

    console.log('Entrando');
    if ( this.termino.length <= 0 ) {
      console.log('Entrando...');
      this.cargarClientes();
      return;
    }

    if ( this.termino.length > 3 ) {
          this.clienteService.buscarClientes( this.termino )
            .subscribe ( (resp: any ) =>  {
              this.clientes = resp.clientes;
              this.totalRegistros = this.clientes.length;
            });
    }

    return;

  }


  borrarCliente( cliente: Cliente ) {

    Swal.fire({
      title: 'Estás seguro',
      text: `Vas a borrar el este cliente ${cliente.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, bórralo'
    }).then((result) => {
      if (result.value) {
        this.clienteService.borrar(cliente._id)
        .subscribe( (resp: any) => {
            if ( resp.ok ){
              Swal.fire(
                'Borrado!',
                `${cliente.nombre}, ha sido borrado`,
                'success'
              );
              this.cargarClientes();
            } else {
              Swal.fire(
                'Error!',
                `Error al borrar ${cliente.nombre}`,
                'error'
              );
            }
        });
      }
    });

    this.termino = '';

  }



  cambiarDesde(i: number) {

    const desde = this.desde + i;

    if ( desde >= this.totalRegistros ) {
      Swal.fire('Usuarios', 'No hay mas usuarios', 'info');
      return;
    }

    if ( desde < 0 ) {
      return;
    }

    this.desde += i;

    this.cargarClientes();

  }

}
