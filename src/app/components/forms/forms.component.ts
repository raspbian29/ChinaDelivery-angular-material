import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Address} from '../../models/Address';
import {User} from '../../models/User';

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
    zipCode: [null, Validators.required],
    secondAddress: null,
  });
  user = this.fb.group({
    fName: [null, Validators.required],
    lName: [null, Validators.required],
    email: [null, Validators.required],
    phoneNumber: [null, Validators.required],
    password: [null, Validators.required],
  });

  hasUnitNumber = false;

  districts = [
    {name: 'Chișinău', abbreviation: 'Chisinau'},
    {name: 'Bălți', abbreviation: 'Balti'},
    {name: 'Ungheni', abbreviation: 'Ungheni'},
  ];

  addressToSend = new Address();
  userToSend = new User();

  constructor(private fb: FormBuilder, private http: HttpClient) {
  }

  onSubmitUser() {
    this.userToSend = this.user.value;
    console.log(this.userToSend);
    this.http.post('/rest/user/updateUser', this.userToSend)
      .toPromise()
      .then(() => alert('Saved!'));
    window.location.reload();
  }

  onSubmitAddress() {
    if (!this.address.valid){
      alert('Check form');
      return;
    }
    this.addressToSend = this.address.value;
    console.log(this.addressToSend);
    this.http.post('/rest/user/setAddress', this.addressToSend)
      .toPromise()
      .then(() => {alert('Saved!');});
  }
}
