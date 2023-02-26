import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { toLower } from 'ionicons/dist/types/components/icon/utils';
import { CommonService } from '../services/sharedservice';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  constructor(private fb: FormBuilder , private commonService:CommonService , private router:Router) { }

  ngOnInit() {
    this.buildForm()
  }

  buildForm()
  {
    this.loginForm = this.fb.group({
      password : ['', [Validators.required]],
      email : ['', [Validators.required , Validators.email]]
    })
  }

  async proceedLogin()
  {
    if(this.loginForm.controls['password'].value.toLowerCase() == '8256455' && this.loginForm.controls['email'].value.toLowerCase() == 'test@test.com')
    {
      this.commonService.presentAlert('SUCCESS' , 'Login Success');
      this.router.navigateByUrl('/home');
    } else{
      this.commonService.presentAlert('WARNING' , 'Invalid Credentials');
    }
  }

}
