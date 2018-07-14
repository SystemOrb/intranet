import { Component, OnInit } from '@angular/core';
declare function init_plugins();
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    init_plugins();
  }

}
