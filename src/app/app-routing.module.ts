import { AddCategoriasComponent } from './pages/admin/add-categorias/add-categorias.component';
import { VerCategoriasComponent } from './pages/admin/ver-categorias/ver-categorias.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NormalGuard } from './services/normal.guard';
import { AdminGuard } from './services/admin.guards';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
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
  },
  {
    //children: admin/profile ---> lo que hace es llevarnos a uno de sus componentes hijos
    path:'admin',
    component:DashboardComponent,
    canActivate:[AdminGuard],
    children:[{
      path: 'profile',
      component: ProfileComponent
    },
    {
      path: '',
      component: WelcomeComponent
    },
    {
      path: 'categorias',
      component: VerCategoriasComponent
    },
    {
      path:'add-categorias',
      component:AddCategoriasComponent,
    }]
  },
  {
    path:'user-dashboard',
    component:UserDashboardComponent,
    pathMatch:'full',
    canActivate: [NormalGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
