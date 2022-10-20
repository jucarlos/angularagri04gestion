import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    console.log( this.authService.isAutenticated());
  }

  entrarSalir() {

    console.log( this.authService.isAutenticated() );

    if ( this.authService.isAutenticated() ) {
      this.authService.logout();
      this.router.navigate([['/home']]);
    } else {
      this.router.navigate(['/auth']);
    }
  }

}
