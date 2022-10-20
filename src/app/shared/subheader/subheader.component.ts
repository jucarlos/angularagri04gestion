import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-subheader',
  templateUrl: './subheader.component.html',
  styles: [
  ]
})
export class SubheaderComponent implements OnInit {

  @Input() titulo = '';

  constructor() { }

  ngOnInit(): void {
  }

}
