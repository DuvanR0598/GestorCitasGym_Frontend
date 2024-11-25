import { LoginService } from 'src/app/services/login.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user:any = null;

  constructor(private loginService:LoginService,
    private userService:UserService,
    private router:Router) { }

  ngOnInit(): void {
    this.user = this.loginService.getUser(); //obtenemos el usuario actual logeado en el sistema
  }

  public actualizarDatos(){
    this.userService.actualizarUsuario(this.user).subscribe(
      (data: string) => {
        Swal.fire('Usuario actualizado','El usuario ha sido actualizada con éxito','success').then(
          (e) => {
            this.router.navigate(['/admin/clases']); //PDTE
          }
        );
      },
      (error) => {
        Swal.fire('Error en el sistema','No se ha podido actualizar el usuario','error');
        console.log(error);
      }
    )
   }
}
