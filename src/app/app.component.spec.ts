import { TestBed, async, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormControl, AbstractControl, FormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { asNativeElements, DebugElement } from '@angular/core';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [AppComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  }));

  // it('should create the component', () => {
  //   expect(component).toBeTruthy();
  // });

  it('form should be invalid when empty', () => {
    expect(component.contactForm.invalid).toBeTruthy();
  });

  it('form should be valid on entering required fields', () => {
    fixture.detectChanges(); // ngOninit()
    component.name.setValue('david');
    component.phone.setValue('9999999999');

    expect(component.contactForm.valid).toBeTruthy();
  });

  describe('#name', () => {
    let name: AbstractControl;

    beforeEach(() => {
      name = component.contactForm.controls['name'];
    });

    it('should be invalid if empty', () => {
      expect(name.invalid).toBeTruthy();
    });

    it('should be a "required" field', () => {
      expect(name.errors['required']).toBeTruthy();
    });

    it('should be valid if some value is present', fakeAsync(() => {
      name.setValue('david');
      expect(name.valid).toBeTruthy();
    }));
  });

  describe('#phone', () => {
    let phone: AbstractControl;
    beforeEach(() => {
      phone = component.contactForm.controls['phone'];
    });

    it('should be invalid if empty', () => {
      expect(phone.invalid).toBeTruthy();
    });

    it('should have "required" validation', () => {
      expect(phone.errors['required']).toBeTruthy();
    });

    it('should accept only numbers(pattern validation)', () => {
      phone.setValue('abc');
      expect(phone.errors['pattern']).toBeTruthy();
    });

    it('should have 10 digits(minlength & maxlength validation)', () => {
      phone.setValue('123');
      expect(phone.errors['minlength']).toBeTruthy();
      phone.setValue('12333333333');
      expect(phone.errors['maxlength']).toBeTruthy();
    });
  });

  describe('#address - zip', () => {
    let address;
    let zip;
    beforeEach(() => {
      address = component.contactForm.controls['address'] as FormGroup ;
      zip = address.controls['zip'] ;
      fixture.detectChanges(); // ngOnInit()
    });
    it('should be a number', fakeAsync(() => {
      zip.setValue('abc');
      expect(zip.errors['pattern']).toBeTruthy();
      zip.setValue('123456');
      fixture.detectChanges();
      expect(zip.valid).toBeTruthy();
    }));
    it('should have 6 digits exactly', () => {
      // enter 3 digits and check for minlength validation
      zip.setValue('123');
      expect(zip.errors['minlength']).toBeTruthy();

      // enter 7 digits and check for maxlength validation
      zip.setValue('1234567');
      fixture.detectChanges(); // update changes, angular will not do for you automatically
      expect(zip.errors['maxlength']).toBeTruthy();
    });
  });
});
