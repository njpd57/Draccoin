import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { DateAdapter } from '@angular/material/core';
import { MindicadorService } from '../sevices/mindicador.service';

import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Indicador } from '../interfaces/indicador';

@Component({
    selector: 'app-particular-precios',
    templateUrl: './particular-precios.component.html',
    styleUrls: ['./particular-precios.component.scss']
})
export class ParticularPreciosComponent implements OnInit {

    mostrarCarga: boolean = true
    indicador: string;
    mensajeError = ''
    nombreIndicador = ''
    ultimaFecha = ''
    valorMasAlto = ''
    unidadDeMedida = ''
    icono = ''
    mostrarGrafico = false

    lineChartData: ChartConfiguration['data'] = {
        datasets: [
            {
                data: [],
                label: 'Series A',
                backgroundColor: 'rgba(148,159,177,0.2)',
                borderColor: 'rgba(148,159,177,1)',
                pointBackgroundColor: 'rgba(148,159,177,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)',
                fill: 'origin',
                pointStyle: 'circle',
                pointRadius: 7,
                pointHoverRadius: 10
            },
        ],
        labels: []
    };

    lineChartOptions: ChartConfiguration['options'] = {
        responsive: true,

        plugins: {
            legend: {
                display: false,
            },

        },
        elements: {
            line: {
                tension: 0 //grafica sin curvas, solo rectos de punto a punto
            }
        },
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day'
                }
            },
            'y-axis-0': { position: 'left' }, //eje y a la izquierda
        },

    };

    lineChartType: ChartType = 'line';

    @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

    constructor(private mindicador: MindicadorService, private activateRoute: ActivatedRoute, private router: Router, private dateAdapter: DateAdapter<Date>) {
        this.dateAdapter.setLocale('es'); //se configura las fecha en espanol
        this.indicador = this.activateRoute.snapshot.paramMap.get('indicador') || ''; //se obtiene el parametro de la url /:indicador
    }

    async ngOnInit() {
        let res: Indicador = await lastValueFrom(this.mindicador.getUltimosValoresIndicador(this.indicador)).catch(error => {
            return error
        })

        if (res.error) {
            this.mensajeError = res.error.message
            this.mostrarCarga = false
        }
        else {
            let series: any[] = res.serie.slice(0, 10) //ultimos 10 valores para el grafico
            let labels = series.map(x => this.parseDate(x.fecha)) //guardar en una lista las fechas que serian los labels
            let valores = series.map(x => x.valor) //guardar en una lista los valores

            this.lineChartData.datasets[0].data = valores //se le asigna los valores al grafico
            this.lineChartData.labels = labels //se le asigna los labels al grafico
            this.chart?.update(); //se refresca la data del grafico

            switch (res.codigo) {  //switch para seleccionar icono de fontawesome a mostrar
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
            this.ultimaFecha = series[0].fecha
            this.unidadDeMedida = res.unidad_medida
            if (res.unidad_medida == 'Porcentaje') {
                this.valorMasAlto = `${series[0].valor}%`
            } else {
                this.valorMasAlto = `$${series[0].valor}`
            }

            this.mostrarCarga = false
            this.mostrarGrafico = true
        }
    }


    volver() {
        this.router.navigateByUrl('/home')
    }

    parseDate(date: string) {
        return date.slice(0, date.indexOf('T'))
    }

}
