import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  /**
     * Cuando entre a cualquier ruta vacia voy a entrar a este componente
     * pathMatch: significa que elige la primera ruta donde la ruta coincide con en el inicio
     * de la URL, pero luego el algoritmo de coincidencia de ruta continua buscando rutas 
     * secundarias coincidentes donde coincide el resto de la URL.
     */
  {
    path:'', 
    component:HomeComponent, 
    pathMatch:'full'
  },
  {
    path:'signup',
    component:SignupComponent,
    pathMatch:'full'
  },
  {
    path:'login',
    component:LoginComponent,
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
