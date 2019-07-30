import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // contactForm: FormGroup;

  // constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // this.contactForm = this.fb.group({
    //   name: [null, [Validators.required]],
    //   phone: [null, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.minLength(10), Validators.maxLength(10)]],
    //   address: this.fb.group({
    //     street: [],
    //     city: [],
    //     zip: [null, [Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.minLength(6), Validators.maxLength(6)]]
    //   })
    // });
  }

  /** create a form (contactForm) with following controls/groups and  validations
   *    - name: control,    valiations: required
   *    - phone: control,   validations: required, number of 10 digits
   *    - address: group
   *      - street: control
   *      - city: control
   *      - zip: number of 6 digits
   */

   contactForm = new FormGroup({
     name: new FormControl(null, [Validators.required]),
     phone: new FormControl(null, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.minLength(10), Validators.maxLength(10)]),
     address: new FormGroup({
       street: new FormControl(),
       city: new FormControl(),
       zip: new FormControl(null, [Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.minLength(6), Validators.maxLength(6)])
     })
   }); 


  onSubmit() {
    console.log('form value =>', this.contactForm.value);
  }

  get name() { return this.contactForm.get('name'); }
  get phone() { return this.contactForm.get('phone'); }
  get zip() { return this.contactForm.controls['address'].get('zip'); }
}
