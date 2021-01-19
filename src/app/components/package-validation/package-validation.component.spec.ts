import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageValidationComponent } from './package-validation.component';

describe('PackageValidationComponent', () => {
  let component: PackageValidationComponent;
  let fixture: ComponentFixture<PackageValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackageValidationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
