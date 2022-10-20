import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { SubheaderComponent } from './subheader/subheader.component';



@NgModule({
  declarations: [
    HeaderComponent,
    SubheaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    SubheaderComponent
  ]
})
export class SharedModule { }
