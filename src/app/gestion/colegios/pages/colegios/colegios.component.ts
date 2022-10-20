import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Colegio } from '../../interfaces/interfaces';
import { ColegiosService } from '../../services/colegios.service';

@Component({
  selector: 'app-colegios',
  templateUrl: './colegios.component.html',
  styleUrls: ['./colegios.component.css']
})
export class ColegiosComponent implements OnInit {

  
  colegios: Colegio[] = [];
  totalRegistros = 0;
  desde = 0;


  cargando = true;
  
  constructor(private colegioService: ColegiosService) { }

  ngOnInit(): void {
    this.cargarColegios();
  }

  cargarColegios() {
    this.cargando = false;
    this.colegioService.listar(this.desde || 0).subscribe( (resp: any) => {
      console.log(  resp );
      this.totalRegistros = resp.total;
      this.colegios = resp.colegios;
      this.cargando = false;
      console.log( this.colegios );
    });
  }


  borrarColegio( colegio: Colegio ) {
    Swal.fire({
      title: 'Estás seguro',
      text: `Vas a borrar el este colegio ${colegio.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, bórralo'
    }).then((result) => {
      if (result.value) {
        this.colegioService.borrar(colegio._id)
        .subscribe( (resp: any) => {
            if ( resp.ok ){
              Swal.fire(
                'Borrado!',
                `${colegio.nombre}, ha sido borrado`,
                'success'
              );
              this.cargarColegios();
            } else {
              Swal.fire(
                'Error!',
                `Error al borrar ${colegio.nombre}`,
                'error'
              );
            }
        });
      }
    });
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

    this.cargarColegios();

  }


}
