import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Cliente } from '../../interfaces/interfaces';
import { ClienteService } from '../../services/cliente.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-detalle-cliente',
  templateUrl: './detalle-cliente.component.html',
  styleUrls: ['./detalle-cliente.component.css']
})
export class DetalleClienteComponent implements OnInit {

  @ViewChild('fCliente') fCliente!: NgForm;

  tituloBoton = 'Crear';
  cliente: Cliente = {
    nombre: '',
    _id: '',
    clouds: '',
    email: '',
    identificador: ''
  };

  idCliente = '';

  imagenSubir: File | undefined | null;
  imagenTemp: any;


  constructor(
    public clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
     this.cargarCliente();
  }


  emailInvalido() {
    return this.fCliente?.controls.email?.invalid && this.fCliente?.controls.email?.touched;
  }

  nombreInvalido() {
    return this.fCliente?.controls.nombre?.invalid && this.fCliente?.controls.nombre?.touched;
  }

  identificadorInvalido() {
    return this.fCliente?.controls.identificador?.invalid && this.fCliente?.controls.identificador?.touched;
  }




  guardarCliente() {

    this.clienteService.crearActualizar( this.cliente )
    .subscribe( (resp: any) => {
       if ( resp.ok ) {
        Swal.fire('Guardado', `${resp.cliente.nombre}, ha sido guardado correctamente`, 'success');
        this.router.navigate(['/gestion/clientes']);
       }
    });
  }

  cargarCliente() {

    this.activatedRoute.params.subscribe( (params: any) => {
      const id =  params['id'];
      this.idCliente = id;


      if ( id !== 'nuevo') {
          this.tituloBoton = 'Actualizar';
          this.clienteService.ver( id )
          .subscribe( resp  => {
            console.log('GetCliente: ', resp);
           this.cliente = resp;
          });
        }
    });
  }

  seleccionImagen( event: any  ) {

    const archivo: File =  event.target.files[0] ;

    if ( !archivo ) {
      this.imagenSubir = undefined;
      return;
    }

    if ( archivo.type.indexOf ( 'image') < 0 ){
      Swal.fire('Sólo imágenes', 'El archivo no es una imágen válida', 'error');
      this.imagenSubir = undefined;
      return;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () => this.imagenTemp = reader.result;

  }
  cambiarImagen() {

    this.clienteService.cambiarImagen( this.imagenSubir!, this.cliente._id )
    .then ( (resp: any ) => {
      if ( resp.ok ) {
        Swal.fire('Imagen actualizada', resp.mensaje, 'success');
        this.volver();
      }
    }).catch ( ( error ) => {
      Swal.fire('Error', 'Ha habido un error al actualizar la imagen', 'error');
    });

  }


  volver() {
    this.router.navigate(['/gestion/clientes']);
  }

}
