import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    mobile=new FormControl ('',[Validators.required,Validators.pattern('[0-9]*'),Validators.minLength(11)]);
    password=new FormControl('',[Validators.required,Validators.minLength(6)]);

  show() {
    if(this.mobile.errors) {
      alert('لطفا اطلاعات را درست وارد نمایید');
    }
    else if(this.password.errors){
      alert('لطفا اطلاعات را درست وارد نمایید');
    }
    else{
      console.log(this.mobile.value);
      console.log(this.password.value);
    }
  }

  matcher = new MyErrorStateMatcher();

  mobilepress(key:KeyboardEvent)
  {
    if(!(key.key>='0' && key.key<='9')){
      key.preventDefault();
    }
  }

  constructor(public http:HttpClient, public router:Router){}

  check()
  {
    this.http.post('https://localhost:7169/adminlogin',{username:this.mobile.value,password:this.password.value}).subscribe(result=>{
      console.log(result);
        if((result as any).isOk==true){
          this.router.navigateByUrl('/dashboard');
        }
        else
        {
          alert("نام کاربری و رمز عبور غلط وارد شده است.");
        }
    });
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
