import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarClaseComponent } from './actualizar-clase.component';

describe('ActualizarCitaComponent', () => {
  let component: ActualizarClaseComponent;
  let fixture: ComponentFixture<ActualizarClaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarClaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarClaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
