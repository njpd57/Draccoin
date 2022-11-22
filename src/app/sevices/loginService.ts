import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Indicadores } from '../interfaces/indicadores';
import { Indicador } from '../interfaces/indicador';


@Injectable({
    providedIn: 'root'
})

export class AuthService{
    api = environment.apilogin;
    constructor(private http: HttpClient) { }

    auth(Email: any,Clave:any): Observable<any[]>{

        return this.http.post<any>(`${this.api}/Usuario/login`,{
            "Email":Email,
            "Clave":Clave
        });

    }

    login(res:any){
    sessionStorage.setItem("Email",res.email);
    sessionStorage.setItem("Token",res.key);
    }

}
