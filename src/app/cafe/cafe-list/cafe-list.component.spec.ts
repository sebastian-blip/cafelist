/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CafeListComponent } from './cafe-list.component';
import { CafeService } from '../cafe.service';
import { of } from 'rxjs';
import { Cafe } from '../cafe';

describe('CafeListComponent', () => {
  let component: CafeListComponent;
  let fixture: ComponentFixture<CafeListComponent>;
  let debug: DebugElement;

  // Datos de prueba
  const cafesMock: Cafe[] = [
    {
      id: 1, nombre: 'Cafe A', tipo: 'Café de Origen', region: 'Antioquia',
      sabor: '',
      altura: 0,
      imagen: ''
    },
    {
      id: 2, nombre: 'Cafe B', tipo: 'Blend', region: 'Huila',
      sabor: '',
      altura: 0,
      imagen: ''
    },
    {
      id: 3, nombre: 'Cafe C', tipo: 'Café de Origen', region: 'Caldas',
      sabor: '',
      altura: 0,
      imagen: ''
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [CafeListComponent],
      providers: [
        {
          provide: CafeService,
          useValue: {
            getCafes: () => of(cafesMock) // Simulación del servicio
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CafeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debug = fixture.debugElement; // Obtener el DebugElement
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a table with three rows plus the header', () => {
    const tableRows = debug.queryAll(By.css('table tbody tr'));
    expect(tableRows.length).toBe(3); // Verifica que hay tres filas en la tabla
  });

  it('should display the correct cafe details in the table', () => {
    const tableRows = debug.queryAll(By.css('table tbody tr'));
    tableRows.forEach((row, i) => {
      const cells = row.queryAll(By.css('td'));
      expect(cells[0].nativeElement.textContent).toContain(cafesMock[i].nombre); // Verifica el nombre
      expect(cells[1].nativeElement.textContent).toContain(cafesMock[i].tipo);   // Verifica el tipo
      expect(cells[2].nativeElement.textContent).toContain(cafesMock[i].region);  // Verifica la región
    });
  });

  it('should update the cafeCount correctly', () => {
    expect(component.cafeCount).toEqual({
      'café de origen': 2, // Dos cafés de origen
      'blend': 1          // Un café blend
    });
  });
});

