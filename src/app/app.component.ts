import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  /** create a form (contactForm) with following controls/groups and  validations
   *    - name: control,    valiations: required
   *    - phone: control,   validations: required, number of 10 digits
   *    - address: group
   *      - street: control
   *      - city: control
   *      - zip: number of 6 digits
   */

  contactForm = new FormGroup({});

  onSubmit() {
    console.log('form value =>', this.contactForm.value);
  }

  get name() { return this.contactForm.get('name'); }
  get phone() { return this.contactForm.get('phone'); }
  get zip() { return this.contactForm.controls['address'].get('zip'); }
}
