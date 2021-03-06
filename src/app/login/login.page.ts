import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email:[ '', [Validators.required, Validators.email] ],
      password:[ '', [Validators.required, Validators.minLength(6)] ]
    });
  }

  login(formData){
    this.authService.login( formData.email, formData.password)
    .then( (response) => {
      //succesful
      this.router.navigate(['']);
    })
    .catch ( (error) => {
      console.log(error);
    })
  }

}
