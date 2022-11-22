import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Indicadores } from '../interfaces/indicadores';
import { Indicador } from '../interfaces/indicador';


@Injectable({
    providedIn: 'root'
})
export class MindicadorService {

    api = environment.api;
    httpHeaders = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
    });
    

    constructor(private http: HttpClient) { }

    getPrincipalesIndicadores(): Observable<Indicadores> {
        return this.http.get<Indicadores>(`${this.api}/api`, {
            headers: this.httpHeaders
        });
    }

    getUltimosValoresIndicador(indicador: string): Observable<Indicador> {
        return this.http.get<Indicador>(`${this.api}/api/${indicador}`, {
            headers: this.httpHeaders
        });
    }

}
