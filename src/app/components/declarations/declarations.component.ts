import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {PackageRequest} from '../../models/PackageRequest';

@Component({
  selector: 'app-declarations',
  templateUrl: './declarations.component.html',
  styleUrls: ['./declarations.component.css']
})
export class DeclarationsComponent {
  packageRequest = this.fb.group({
    itemType: [null, Validators.required],
    amount: [null, Validators.required],
    price: [null, Validators.required],
    currency: [null, Validators.required],
    trackCode: [null, Validators.required],
    itemNotes: null,
    options: []
  });

  hasUnitNumber = false;

  itemTypes = [
    {name: 'Clothing Items', abbreviation: 1},
    {name: 'Spare Parts', abbreviation: 3},
    {name: 'Consumer Electronics', abbreviation: 0},
    {name: 'Sport Gear', abbreviation: 2},
    {name: 'Other', abbreviation: 4}
  ];

  currencyTypes = [
    {name: 'USD', abbreviation: 0},
    {name: 'EUR', abbreviation: 1},
    {name: 'CNY', abbreviation: 3},
    {name: 'MDL', abbreviation: 2}
  ];

  optionTypes = [
    {name: 'Photo', key: 'itemPhoto'},
    {name: 'Repack', key: 'itemRepack'},
    {name: 'Check', key: 'itemCheck'},
    {name: 'Split', key: 'itemSplit'},
    {name: 'Insurance', key: 'itemInsurance'},
  ];

  constructor(private fb: FormBuilder, private http: HttpClient) {
  }


  onSubmit(): void {
    if (!this.packageRequest.valid) {
      alert('Please check all fields');
      return;
    }
    const formData = this.packageRequest.value;
    const requestBody = Object.assign(new PackageRequest(), formData);
    delete requestBody.options;
    for (const option of this.optionTypes) {
      requestBody[option.key] = formData.options.indexOf(option.key) !== -1;
    }
    this.http.post('/rest/package/addPackageRequest', requestBody)
      .toPromise()
      .then(() => {
        alert('Saved!');
      });
    this.packageRequest.reset();
  }
}
