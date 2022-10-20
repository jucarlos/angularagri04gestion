import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {  NgForm } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  // @ViewChild('email') email!: ElementRef;

  @ViewChild('miFormulario') miFormulario!: NgForm;

  cargando = false;


  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  isEmailValido() {

     return this.miFormulario?.controls.email?.invalid && 
           this.miFormulario?.controls.email?.touched;

    
    
  }

  entrar( miFormulario: NgForm) {

      this.cargando = true;
   
      console.log( miFormulario.value );
      console.log( miFormulario );
  
      const email = this.miFormulario.controls.email.value;
      const password = this.miFormulario.controls.password.value;
  
  
      this.authService.login( email, password  )
      .subscribe( resp => {
  
        console.log( 'Resp: ', resp );
        if ( resp ) {
          this.router.navigate(['/home']);
        } else {
          Swal.fire('Error', 'Credenciales incorrectas', 'info');
        }

        this.cargando = false;
      });
    
    
  }

}
