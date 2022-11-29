import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { lastValueFrom } from 'rxjs';
import { MindicadorService } from '../sevices/mindicador.service';

import { CustomPaginator } from '../customPaginator';
import { Indicador } from '../interfaces/indicador';

@Component({
    selector: 'app-detalle-precios',
    templateUrl: './detalle-precios.component.html',
    styleUrls: ['./detalle-precios.component.scss'],
    providers: [
        { provide: MatPaginatorIntl, useValue: CustomPaginator() }
    ]
})

export class DetallePreciosComponent implements OnInit {

    mostrarCarga: boolean = true
    mostrarTabla: boolean = false
    indicador: string;
    dataSource: any;
    displayedColumns: string[] = ['fecha', 'valor'];
    mensajeError = ''
    nombreIndicador = ''
    unidadDeMedida = ''
    icono = ''

    @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(private mindicador: MindicadorService, private activateRoute: ActivatedRoute, private router: Router) {
        this.indicador = this.activateRoute.snapshot.paramMap.get('indicador') || '';  //se obtiene el parametro de la url /:indicador
    }

    async ngOnInit() {
        let res: Indicador = await lastValueFrom(this.mindicador.getUltimosValoresIndicador(this.indicador)).catch( error => {
            return error
        })

        if(res.error){
            this.mensajeError = res.error.message
            this.mostrarCarga = false
        }
        else{

            switch (res.codigo) {   //switch para seleccionar icono de fontawesome a mostrar
                case 'uf':
                    this.icono = `fa-solid fa-chart-line icon-uf`
                    break;
                case 'ivp':
                    this.icono = `fa-solid fa-scale-balanced icon-ivp`
                    break;
                case 'dolar':
                    this.icono = `fa-solid fa-dollar-sign icon-dolar`
                    break;
                case 'dolar_intercambio':
                    this.icono = `fa-solid fa-dollar-sign icon-dolar`
                    break;
                case 'euro':
                    this.icono = `fa-solid fa-euro-sign icon-euro`
                    break
                case 'ipc':
                    this.icono = `fa-solid fa-hand-holding-dollar icon-dolar`
                    break;
                case 'utm':
                    this.icono = `fa-solid fa-coins icon-utm`
                    break;
                case 'imacec':
                    this.icono = `fa-solid fa-money-bill-1-wave icon-dolar`
                    break;
                case 'tpm':
                    this.icono = `fa-solid fa-building-columns icon-tpm`
                    break;
                case 'libra_cobre':
                    this.icono = `fa-solid fa-helmet-safety icon-cobre`
                    break;
                case 'tasa_desempleo':
                    this.icono = `fa-solid fa-user icon-desempleo`
                    break
                case 'bitcoin':
                    this.icono = `fa-brands fa-bitcoin icon-bitcoin`
                    break
                default:
                    this.icono = `fa-solid fa-dollar-sign icon-dolar`
            }
            this.nombreIndicador = res.nombre
            this.unidadDeMedida = `(${res.unidad_medida})`
            this.mostrarCarga = false
            this.mostrarTabla = true
            this.dataSource = new MatTableDataSource(res.serie);  //se le asigna la data a la tabla
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
        }


    }

    parseDate(date: string) {
        return date.slice(0, date.indexOf('T')) //2022-03-25T03:00:00.000Z --> 2022-03-25
    }

    volver() {
        this.router.navigateByUrl('/home')
    }

}
