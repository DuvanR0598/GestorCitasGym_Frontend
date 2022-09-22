import Swal from 'sweetalert2';
import { CategoriaService } from './../../../services/categoria.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ver-categorias',
  templateUrl: './ver-categorias.component.html',
  styleUrls: ['./ver-categorias.component.css']
})
export class VerCategoriasComponent implements OnInit {

  categorias:any = [

  ]

  constructor(private categoriaService:CategoriaService) { }

  ngOnInit(): void {
    this.categoriaService.listarCategorias().subscribe(
      (dato:any) => {
        this.categorias = dato;
        console.log(this.categorias);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error al cargar las categorias')
      }
    )
  }

}
