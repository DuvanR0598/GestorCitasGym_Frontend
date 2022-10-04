import { LoginService } from './login.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    
    constructor(private loginService:LoginService){}

    /**
     * El interceptor nos sirve para modificar peticiones.
     * con este metodo lo que hacemos es añadir una cabecera del bearer token para cualquier tipo de 
     * peticion... GET POST PUT DELETE
     * @param req 
     * @param next 
     * @returns 
     */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReq = req;
        const token = this.loginService.getToken();

        if(token != null){
            authReq = authReq.clone({
                setHeaders: {Authorization: `Bearer ${token}`}
            })
        }
        return next.handle(authReq);
    }
}

export const AuthInterceptorProviders = [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
}]