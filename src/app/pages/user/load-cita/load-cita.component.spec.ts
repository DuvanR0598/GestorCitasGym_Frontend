import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadCitaComponent } from './load-cita.component';

describe('LoadCitaComponent', () => {
  let component: LoadCitaComponent;
  let fixture: ComponentFixture<LoadCitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadCitaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
