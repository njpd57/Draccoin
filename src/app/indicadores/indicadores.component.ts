import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Indicadores } from '../interfaces/indicadores';
import { MindicadorService } from '../sevices/mindicador.service';



@Component({
    selector: 'app-indicadores',
    templateUrl: './indicadores.component.html',
    styleUrls: ['./indicadores.component.scss']
})
export class IndicadoresComponent implements OnInit {

    indicadores: any

    constructor( private mindicatorService: MindicadorService, private router: Router) { }

    async ngOnInit() {
        let res: Indicadores = await lastValueFrom(this.mindicatorService.getPrincipalesIndicadores())

        this.indicadores = [ 
            [res.bitcoin, `fa-brands fa-bitcoin icon-bitcoin`],
            [res.dolar, `fa-solid fa-dollar-sign icon-dolar`],
            [res.dolar_intercambio, `fa-solid fa-dollar-sign icon-dolar`],
            [res.euro, `fa-solid fa-euro-sign icon-euro`],
            [res.imacec, `fa-solid fa-money-bill-1-wave icon-dolar`],
            [res.ipc, `fa-solid fa-hand-holding-dollar icon-dolar`],
            [res.ivp, `fa-solid fa-scale-balanced icon-ivp`],
            [res.libra_cobre, `fa-solid fa-helmet-safety icon-cobre`],
            [res.tasa_desempleo, `fa-solid fa-user icon-desempleo`],
            [res.tpm, `fa-solid fa-building-columns icon-tpm`],
            [res.uf, `fa-solid fa-chart-line icon-uf`],
            [res.utm, `fa-solid fa-coins icon-utm`]
        ]
    }

    routerDetallePrecios(indicador: string){
        this.router.navigateByUrl(`/precios/${indicador}`)
    }
    

    routerDetalleIndicador(indicador: string, e: Event){
        this.router.navigateByUrl(`/particular/${indicador}`)
        e.stopPropagation() //se detiene la propagacion de eventos ya que el evento click del signo de exclamacion se encuentra dentro de un div que tambien posee un evento click
    }
    

}
