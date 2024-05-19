import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClasesComponent } from './add-clase.component';

describe('AddCitasComponent', () => {
  let component: AddClasesComponent;
  let fixture: ComponentFixture<AddClasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddClasesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddClasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
