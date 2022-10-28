import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  

  constructor(private usuarioService:UsuariosService) { }

  ngOnInit(): void {
  }

  getUsuariosPDF(){
    this.usuarioService.generateListUsuariosPDF().subscribe((data) => {
      let dowloadURL = window.URL.createObjectURL(data)
      let link = document.createElement('a')
      link.href = dowloadURL
      link.download = "Usuarios_Energym.pdf"
      link.click()
    })
  }

}
