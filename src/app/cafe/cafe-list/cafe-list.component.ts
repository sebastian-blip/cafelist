import { Component, OnInit } from '@angular/core';
import { Cafe } from '../cafe'
import { CafeService } from '../cafe.service';

@Component({
  selector: 'app-cafe-list',
  templateUrl: './cafe-list.component.html',
  styleUrls: ['./cafe-list.component.css']
})
export class CafeListComponent implements OnInit {

  cafes: Array<Cafe> = [];
  cafeCount: { [key: string]: number } = {};
  
  constructor(private cafeService: CafeService) { }
 
  getCafes(): void {
    this.cafeService.getCafes().subscribe((cafes) => {
      this.cafes = cafes;
  
      // Declarar el tipo del diccionario para evitar el error
      this.cafeCount = this.cafeCount;
  
      // Iterar sobre la lista de cafés
      this.cafes.forEach((cafe) => {
        const tipo = cafe.tipo; // Suponiendo que el atributo es 'tipo'
        if (this.cafeCount[tipo]) {
          this.cafeCount[tipo]++;
        } else {
          this.cafeCount[tipo] = 1;
        }
      });
  
    });
  }
 
  ngOnInit() {
    this.getCafes();
  }
 
 }
