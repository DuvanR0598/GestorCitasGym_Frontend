import { ClasesService } from '../../../services/clases.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-load-clase',
  templateUrl: './load-clase.component.html',
  styleUrls: ['./load-clase.component.css']
})
export class LoadCitaComponent implements OnInit {

  idCat:any;
  clases:any;

  constructor(private route:ActivatedRoute,
    private claseService:ClasesService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.idCat = params['idCat'];

      if(this.idCat == 0){
        console.log("Cargando todas las clases")
        //this.claseService.listarClases().subscribe(
          this.claseService.listarClasesActivas().subscribe(
          (data) => {
            this.clases = data;
            console.log(this.clases);
          },
          (error) => {
            console.log(error);
          }
        )
      }else{
        console.log("Cargando una clase en específico");
        //this.claseService.listarClasesDeUnaCategoria(this.idCat).subscribe(
          this.claseService.listarClasesActivasDeUnaCategoria(this.idCat).subscribe(
          (data:any) => {
            this.clases = data;
            console.log(this.clases);
          },
          (error) => {
            console.log(error);
          }
        );
      }
    });
  }

  inscribirme(idClase: number) {
    // Obtener el usuario del localStorage
    const usuario = JSON.parse(localStorage.getItem('user') || '{}');
    console.log(usuario);  // Debería mostrar el objeto del usuario

    // Obtener la cédula del usuario
    const cedulaUsuario = usuario.cedula;
    console.log(cedulaUsuario); // Debería mostrar la cedula del usuario logeado

    if (!cedulaUsuario) {
      console.error('Cédula del usuario no encontrada en el localStorage');
      this.snackBar.open('Cédula del usuario no encontrada', 'Cerrar', {
        duration: 3000,
      });
      return;
    }

    console.log(`Inscribiendo al usuario con cédula: ${cedulaUsuario} en la clase con id: ${idClase}`);

    this.claseService.inscribirUsuarioClase(idClase, cedulaUsuario).subscribe(
      (response: string) => {
        console.log('Inscripción exitosa', response);
        this.snackBar.open('Inscripción exitosa', 'Cerrar', {
          duration: 3000,
        });  
      },
      (error) => {
        console.error('Error en la inscripción', error);
        this.snackBar.open('Lo siento, renueva tu membresia para inscribirte a una clase', 'Cerrar', {
          duration: 5000,
        });
      }
    );
  }

}
