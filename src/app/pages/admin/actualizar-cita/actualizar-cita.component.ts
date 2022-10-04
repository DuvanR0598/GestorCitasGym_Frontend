import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from 'src/app/services/categoria.service';
import { CitasService } from 'src/app/services/citas.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar-cita',
  templateUrl: './actualizar-cita.component.html',
  styleUrls: ['./actualizar-cita.component.css']
})
export class ActualizarCitaComponent implements OnInit {

  constructor(private route:ActivatedRoute,
    private citaService:CitasService,
    private categoriaService:CategoriaService,
    private loginService:LoginService,
    private router:Router) { }

  idCita = 0;
  cita:any;
  categorias:any;
  user:any = null;

  ngOnInit(): void {
    this.idCita = this.route.snapshot.params['idCita'];
    this.citaService.obtenerCita(this.idCita).subscribe(
      (data) => {
        this.cita = data;
        console.log(this.cita);
      },
      (error) => {
        console.log(error);
      }
    )
    this.user = this.loginService.getUser(); //obtenemos el usuario actual logeado en el sistema

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
    this.citaService.actualizarCita(this.cita).subscribe(
      (data) => {
        Swal.fire('Cita actualizada','La cita ha sido actualizada con éxito','success').then(
          (e) => {
            this.router.navigate(['/admin/citas-grupales']);
          }
        );
      },
      (error) => {
        Swal.fire('Error en el sistema','No se ha podido actualizar la cita','error');
        console.log(error);
      }
    )
  }
}
