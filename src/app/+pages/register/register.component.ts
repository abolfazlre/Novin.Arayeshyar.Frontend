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
    fullname:['',[Validators.required,Validators.pattern("[ا-یa-zA-Z ]*"),Validators.minLength(5)]],
    mobile:['',[Validators.required,Validators.minLength(11),Validators.maxLength(11),Validators.pattern("[0-9]*")]],
    password:['',[Validators.required,Validators.minLength(6),]],
    repassword:['',[Validators.required,Validators.minLength(6)]],
    address:['',[Validators.required]],
  })

  show(){
    if(this.registerForm.controls.password.value==this.registerForm.controls.repassword.value){
      if(this.registerForm.valid){
        console.log('mobile:' + this.registerForm.value.mobile);
        console.log('fullname:' + this.registerForm.value.fullname);
        console.log('type:' + this.registerForm.value.type);
        console.log('password:' + this.registerForm.value.password);
        console.log('repassword:' + this.registerForm.value.repassword);
        console.log('address:' + this.registerForm.value.address);
      }
    }
    else{
      alert('رمز عبور با تکرار آن مشابه نیست.');
    }
  }

  matcher = new MyErrorStateMatcher();

}
// this.registerForm.controls.password==this.registerForm.controls.repassword


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
