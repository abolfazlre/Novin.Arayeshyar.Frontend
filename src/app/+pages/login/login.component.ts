import { Component } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

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

}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
