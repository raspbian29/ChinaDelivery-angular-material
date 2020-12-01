import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Address} from '../../models/Address';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent {
  address = this.fb.group({
    district: [null, Validators.required],
    city: [null, Validators.required],
    street: [null, Validators.required],
    streetNumber: [null, Validators.required],
    apartmentNumber: [null, Validators.required],
    zipCode: [null, Validators.compose([
      Validators.required, Validators.minLength(5), Validators.maxLength(5)])
    ],
    secondAddress: null,
  });

  hasUnitNumber = false;

  districts = [
    {name: 'Chișinău', abbreviation: 'Chisinau'},
    {name: 'Bălți', abbreviation: 'Balti'},
    {name: 'Ungheni', abbreviation: 'Ungheni'},
  ];

  addressToSend = new Address();

  constructor(private fb: FormBuilder, private http: HttpClient) {
  }

  onSubmit() {
    this.addressToSend = this.address.value;
    console.log(this.addressToSend);
    this.http.post('/rest/user/setAddress', this.addressToSend)
      .toPromise()
      .then(() => {
        alert('Saved!');
      });

  }
}
