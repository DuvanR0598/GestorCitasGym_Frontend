import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadInscripcionesComponent } from './load-inscripciones.component';

describe('LoadInscripcionesComponent', () => {
  let component: LoadInscripcionesComponent;
  let fixture: ComponentFixture<LoadInscripcionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadInscripcionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadInscripcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
