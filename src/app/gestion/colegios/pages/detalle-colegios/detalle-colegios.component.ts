import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ColegiosService } from '../../services/colegios.service';
import { Colegio } from '../../interfaces/interfaces';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { noPuedeSerCadiz } from 'src/app/helpers/validators/validator';


@Component({
  selector: 'app-detalle-centros',
  templateUrl: './detalle-colegios.component.html',
  styleUrls: ['./detalle-colegios.component.css']
})
export class DetalleColegiosComponent implements OnInit {

  // Es la forma normal de definir un formulario reactivo
  // formColegio: FormGroup = new FormGroup({
  //   nombre   : new FormControl(''),
  //   localidad: new FormControl('')
  // });

  // Lo normal que se hace es con FormBuilder. Es una pereza hacer lo anterior.
  // Son para hacer formularios complejos.
  // Es un servicio que hay que inyectar
  //

  // Voy a poner una validación personalizada para que por ejemplo no pueda ser de la localidad de Cadiz


  formColegio: FormGroup = this.fb.group({

    nombre   : ['', [ 
      Validators.required,
      Validators.minLength(5)
     ], ], // valor por defecto, validadores sincronos, y asíncronos
    localidad: ['', [ 
      Validators.required,
      Validators.minLength(5),
      noPuedeSerCadiz
     ],],
    email    : ['', [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
    ], ]
    
  });

  idColegio = '';
  tituloBoton = 'Crear';
  noPuedeSerCadiz: any;


  constructor(private fb: FormBuilder,
              private colegiosService: ColegiosService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  campoInvalido( campo: string ) {
    // return this.formColegio.controls.nombre.errors 
    //       && this.formColegio.controls.nombre.touched;

    return this.formColegio.controls[campo].errors 
          && this.formColegio.controls[campo].touched
  }

  ngOnInit(): void {
    // Valores por defecto.
    // this.formColegio.setValue({
    // tiene que ser un objeto igual.
    // });
    // Es mejor hacer reset.

    this.activatedRoute.params.subscribe( (params: any) => {

      const id =  params['id'];
      this.idColegio = id;


      if ( id !== 'nuevo') {
          this.tituloBoton = 'Actualizar';
          this.colegiosService.ver( id )
          .subscribe( resp  => {
            console.log('GetColegio: ', resp);
            this.formColegio.reset( resp ); 
          });
        }
    });

    // Al ser reactivo, nos podemos subscribir al formulario o a un control

  }

  guardar() {

    if ( this.formColegio.invalid ) {
      // que aparezcan todos los errores, para eso 'tocamos' los campos
      this.formColegio.markAllAsTouched();
      
      return;
    }

    console.log( this.formColegio.value );

    // Si quiero 'limpiar todo', se puede hacer:

    const colegio: Colegio = {...this.formColegio.value};
    colegio._id = this.idColegio;

    this.colegiosService.crearActualizar( colegio )
    .subscribe( (resp: any) => {
       if ( resp.ok ) {
        Swal.fire('Guardado', `${resp.colegio.nombre}, ha sido guardado correctamente`, 'success');
        this.router.navigate(['/gestion/colegios']);
       }
    });


   // this.formColegio.reset();
  }




}
