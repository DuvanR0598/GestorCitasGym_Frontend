import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ClasesService } from 'src/app/services/clases.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar-cita',
  templateUrl: './actualizar-clase.component.html',
  styleUrls: ['./actualizar-clase.component.css']
})
export class ActualizarClaseComponent implements OnInit {

  constructor(private route:ActivatedRoute,
    private clasesService:ClasesService,
    private categoriaService:CategoriaService,
    private loginService:LoginService,
    private router:Router) { } 

  idClases = 0;
  clase:any;
  categorias:any;
  user:any = null;

  ngOnInit(): void {
    this.idClases = this.route.snapshot.params['idClases'];
    this.clasesService.obtenerClase(this.idClases).subscribe(
      (data) => {
        this.clase = data;
        console.log(this.clase);
      },
      (error) => {
        console.log(error);
      }
    )
    //this.user = this.loginService.getUser(); //obtenemos el usuario actual logeado en el sistema

    this.categoriaService.listarCategorias().subscribe(
      (data:any) => {
        this.categorias = data;
      },
      (error) => {
        alert('Error al cargar las categorías');
      }
    )
  }

  public actualizarDatos(){
    this.clasesService.actualizarClase(this.clase).subscribe(
      (data: string) => {
        Swal.fire('Clase actualizada','La clase ha sido actualizada con éxito','success').then(
          (e) => {
            this.router.navigate(['/admin/clases']);
          }
        );
      },
      (error) => {
        const errorMessage = error.error || 'No se ha podido actualizar la clase';
        Swal.fire('Error en la validación',errorMessage,'error');
        console.log(error);
        console.log(error.error);
      }
    )
   }
}
