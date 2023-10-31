import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(private fb: FormBuilder) {}

  registerForm = this.fb.group({
    type: ['', Validators.required],
    fullname: [
      '',
      [
        Validators.pattern('[آ-ی ]*'),
        Validators.minLength(5),
      ],
    ],
    mobile: [
      '',
      [
        Validators.required,
        Validators.minLength(11),
        Validators.pattern('[0-9]*'),
      ],
    ],
    password: ['', [Validators.required, Validators.minLength(6)]],
    birthDate:[''],
    address:['']
  });

  show() {
    if (this.registerForm.valid) {
      console.log('mobile:' + this.content.mobile);
      console.log('fullname:' + this.content.fullname);
      console.log('type:' + this.content.type);
      console.log('password:' + this.content.password);
      console.log('birthDate:' + this.content.birthDate);
      console.log('address:' + this.content.address);
    }
  }

  mobilePress(key: KeyboardEvent) {
    if (!(key.key >= '0' && key.key <= '9')) {
      key.preventDefault();
    }
  }

  namePress(key: KeyboardEvent) {
    if (key.key == ' ') {
      return;
    }

    if (!(key.key >= 'آ' && key.key <= 'ی')) {
      key.preventDefault();
    }
  }

  matcher = new MyErrorStateMatcher();

  get control() {
    return this.registerForm.controls;
  }
  get content() {
    return this.registerForm.value;
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

export class DatepickerDateClassExample {
  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view.
    if (view === 'month') {
      const date = cellDate.getDate();

      // Highlight the 1st and 20th day of each month.
      return date === 1 || date === 20 ? 'example-custom-date-class' : '';
    }

    return '';
  };
}
