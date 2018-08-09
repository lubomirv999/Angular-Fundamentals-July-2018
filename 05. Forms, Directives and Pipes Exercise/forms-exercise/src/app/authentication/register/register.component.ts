import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RegisterModel } from '../models/register.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: RegisterModel;
  registerFailed: boolean;
  errMessage: string;

  constructor(private authService: AuthService, private router: Router) {
    this.model = new RegisterModel('', '', '', '', '', 18);
  }

  register() {
    delete this.model['confirmPassword'];
    this.authService.register(this.model)
      .subscribe(data => {
        this.router.navigate(['/login']);
      }, 
      err =>{
        this.registerFailed = true;
        this.errMessage = err['error']['description'];
      })
  }

  ngOnInit() {
  }
}
