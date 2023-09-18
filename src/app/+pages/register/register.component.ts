import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(private fb:FormBuilder){}

  registerForm=this.fb.group({
    type:['',Validators.required],
    fullname:['',[Validators.required,Validators.pattern("[آ-ی ]*"),Validators.minLength(5)]],
    mobile:['',[Validators.required,Validators.minLength(11),Validators.pattern("[0-9]*")]],
    password:['',[Validators.required,Validators.minLength(6),]],
    repassword:['',[Validators.required,Validators.minLength(6)]],
    address:['',[Validators.required]],
  })

  show(){
    if(this.control.password.value==this.control.repassword.value){
      if(this.registerForm.valid){
        console.log('mobile:' + this.content.mobile);
        console.log('fullname:' + this.content.fullname);
        console.log('type:' + this.content.type);
        console.log('password:' + this.content.password);
        console.log('repassword:' + this.content.repassword);
        console.log('address:' + this.content.address);
      }
    }
    else{
      alert('رمز عبور با تکرار آن مشابه نیست.');
    }
  }

  mobilePress(key:KeyboardEvent)
  {
    if(!(key.key>='0' && key.key<='9')){
      key.preventDefault();
    }
  }

  namePress(key:KeyboardEvent)
  {
    if(key.key==' '){
      return;
    }

    if(!(key.key>='آ' && key.key<='ی')){
      key.preventDefault();
    }
  }

  matcher = new MyErrorStateMatcher();

  get control(){
    return this.registerForm.controls;
  }
  get content(){
    return this.registerForm.value;
  }
}
// this.registerForm.controls.password==this.registerForm.controls.repassword


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
